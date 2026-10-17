import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '@theme/Layout';
import styles from './css/contact.module.css';

type InputType = 'name' | 'email' | 'kind' | 'text' | 'all';
const errorMags: { [key in InputType]: null | string } = {
  name: null,
  email: null,
  kind: null,
  text: null,
  all: null
};

export default class Contact extends React.Component {
  state = { errorMags, isLoading: false, isSuccess: false };
  values: { [key in Exclude<InputType, 'all'>]: string | null } = {
    name: null,
    email: null,
    kind: null,
    text: null
  };

  private inputCheck(type: InputType, input: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (type === 'kind' && input.currentTarget.value === 'eew-secondary-use') {
      this.values.text = null;
    }
    if (input.currentTarget.checkValidity()) {
      errorMags[type] = null;
      this.values[type] = input.currentTarget.value;
    } else {
      if (type === 'name') {
        errorMags.name = '入力してください（最大64文字）';
      }
      if (type === 'email') {
        errorMags.email = 'メールアドレスを入力してください';
      }
      if (type === 'kind') {
        errorMags.kind = '選択してください';
      }
      if (type === 'text') {
        errorMags.text = '入力してください（最大4096文字）';
      }
      this.values[type] = null;
    }

    this.setState({ errorMags });
  }

  private async submit() {
    errorMags.all = null;
    if (!this.values.name || !this.values.email || !this.values.kind || !this.values.text) {
      errorMags.all = 'すべて入力してください';
      this.setState({ errorMags });
      return;
    }

    if (this.state.isLoading) {
      return;
    }

    this.setState({ isLoading: true });

    const grc = await gReCaptcha();

    await fetch('/contact-post', {
      method: 'post',
      body: JSON.stringify({ ...this.values, grc }),
      headers: {
        'content-type': 'application/json'
      }
    });

    this.setState({ isSuccess: true });
  }

  render() {
    return (
      <Layout title="お問い合わせ">
        <Helmet>
          <script src="https://www.google.com/recaptcha/enterprise.js?render=6Lf3LrErAAAAABBfYPIeCTkfaCvXZaJwkr65JkP8"
                  async defer></script>
        </Helmet>
        <div className={styles.contact}>
          <h1>お問い合わせ</h1>
          <p>このページを利用するか、「support#dmdata.jp」(#を@に変更してください)宛にメールを送信してください。</p>
          <p>すべての項目が必須項目です。</p>
          <div className={styles.form}>
            <form action="/contact-post" method="post" id="forms" autoComplete="off">
              <table className={styles['form-table']}>
                <tbody>
                  <tr>
                    <th>お名前</th>
                    <td>
                      <label>
                        <input type="text" className={styles.long} required maxLength={64}
                               onInput={event => this.inputCheck('name', event)}/>
                      </label>
                      {this.state.errorMags.name &&
                          <span className={styles.error}>{this.state.errorMags.name}</span>}
                    </td>
                  </tr>
                  <tr>
                    <th>返信先</th>
                    <td>
                      <label>
                        <input type="email" className={styles.long} placeholder="メールアドレス" required
                               maxLength={256}
                               onInput={event => this.inputCheck('email', event)}/>
                      </label>
                      {this.state.errorMags.email &&
                          <span className={styles.error}>{this.state.errorMags.email}</span>}
                    </td>
                  </tr>
                  <tr>
                    <th>種類</th>
                    <td>
                      <select name="kind" id="kind" required onChange={event => this.inputCheck('kind', event)}>
                        <option value="">-</option>
                        <option value="about">サービスの内容について</option>
                        <option value="business">法人・団体の新規契約について</option>
                        <option value="technical">技術的な問題・質問について</option>
                        <option value="eew-secondary-use">緊急地震速報の二次利用について</option>
                        <option value="others">その他</option>
                      </select>
                      {this.state.errorMags.kind &&
                          <span className={styles.error}>{this.state.errorMags.kind}</span>}
                    </td>
                  </tr>
                  <tr>
                    <th>内容</th>
                    <td>
                      {this.values.kind === 'eew-secondary-use' ?
                        (<div>
                          <p>個人向け契約の緊急地震速報（予報）を使用する場合は、
                            <a
                              href="https://dmdata.jp/docs/eew#%E5%86%8D%E9%85%8D%E4%BF%A1%E3%83%9D%E3%83%AA%E3%82%B7%E3%83%BC">再配信ポリシー</a>
                            を参照いただきますようお願いいたします。
                          </p>
                          <p>緊急地震速報（警報）を使用する場合は、
                            <a href="https://dmdata.jp/docs/eew">EEWについて</a>を参照いただき、利用には十分注意を払ってください。</p>
                          <br/>
                          <p>法人向け・団体向けをご利用になられる場合は、「法人・団体の新規契約について」を選択の上、お問い合わせください。</p>
                        </div>)
                        :
                        (<label>
                        <textarea className={styles['input-text']}
                                  placeholder="できるだけ詳しくお願いします。なお、クレジットカード番号・CVC、パスワードなどは記載しないでください。"
                                  required
                                  maxLength={4096} onInput={event => this.inputCheck('text', event)}></textarea>
                        </label>)
                      }
                      {this.state.errorMags.text &&
                          <span className={styles.error}>{this.state.errorMags.text}</span>}
                    </td>
                  </tr>
                </tbody>
              </table>
              {this.state.errorMags.all &&
                  <div className={`${styles['main-error']} ${styles.error}`}>{this.state.errorMags.all}</div>}
              <p>メールで返信の際、「dmdata.jp」から回答させていただきますので、必ず受信拒否設定などになっていないか確認してください。</p>
              <p>なお、メールアドレスは受信できるものを指定してください。</p>
              <p>内容により回答を差し控えさせていただく場合があります。予めご了承ください。</p>
              <div className={styles.button}>
                <a href="/terms" target="_new">利用規約</a>
                に同意して
                <input type="button" value="送信" className={styles['form-submit']} onClick={() => this.submit()}/>
              </div>
              <p>お問い合わせの対応は、平日9時から18時になります。</p>
            </form>
            {this.state.isLoading &&
                <div className={styles['process-status']}>
                  {this.state.isLoading && !this.state.isSuccess && (
                    <p>送信中です</p>)} {this.state.isLoading && this.state.isSuccess && (<p>送信しました</p>)}
                </div>}

          </div>
        </div>
      </Layout>
    );
  }
}

function gReCaptcha() {
  return new Promise<string>(resolve =>
    globalThis.grecaptcha.enterprise.ready(() => {
      globalThis.grecaptcha.enterprise
        .execute('6Lf3LrErAAAAABBfYPIeCTkfaCvXZaJwkr65JkP8', {
          action: 'contact'
        })
        .then((token: string) => resolve(token));
    }));
}
