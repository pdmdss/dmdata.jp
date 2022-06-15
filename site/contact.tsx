import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '@theme/Layout';
import styles from './css/contact.module.css';

type InputType = 'name' | 'email' | 'text' | 'all';
const errorMags: { [key in InputType]: null | string } = {
  name: null,
  email: null,
  text: null,
  all: null
};

export default class Contact extends React.Component {
  state = { errorMags, isLoading: false, isSuccess: false };
  values: { [key in Exclude<InputType, 'all'>]: string | null } = {
    name: null,
    email: null,
    text: null
  };

  private inputCheck(type: InputType, input: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) {
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
      if (type === 'text') {
        errorMags.text = '入力してください（最大4096文字）';
      }
      this.values[type] = null;
    }

    this.setState({ errorMags });
  }

  private async submit() {
    errorMags.all = null;
    if (!this.values.name || !this.values.email || !this.values.text) {
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
      <Layout title="お問い合わせ"> <Helmet>
        <script src="https://www.google.com/recaptcha/api.js?render=6Lc_fc0UAAAAAH_V_BLn7qugwThlhaqeJTK0Vt-k"></script>
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
                        <input type="email" className={styles.long} placeholder="メールアドレス" required maxLength={256}
                               onInput={event => this.inputCheck('email', event)}/>
                      </label>
                      {this.state.errorMags.email &&
                          <span className={styles.error}>{this.state.errorMags.email}</span>}
                    </td>
                  </tr>
                  <tr>
                    <th>内容</th>
                    <td>
                      <label>
                        <textarea className={styles['input-text']} placeholder="できるだけ詳しくお願いします。" required
                                  maxLength={4096} onInput={event => this.inputCheck('text', event)}></textarea>
                      </label>
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
    globalThis.grecaptcha.ready(() => {
      globalThis.grecaptcha
        .execute('6Lc_fc0UAAAAAH_V_BLn7qugwThlhaqeJTK0Vt-k', {
          action: 'contact'
        })
        .then((token: string) => resolve(token));
    }));
}
