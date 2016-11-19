import React from "react";
import {connect} from "react-redux";

const Login = () => {
  return (
    <main className="my-band">
        <div className="new-account">
            <form>
                <h1>Doresc un cont nou</h1>
                <p>Suspendisse euismod diam vel massa ornare placerat. Phasellus eu nisl in elit scelerisque ultricies. Aliquam congue orci sapien, ac mattis risus lacinia ut. Ut finibus facilisis leo, vitae fringilla tellus condimentum et.</p>
                <label htmlFor="new-account-email">E-mail</label>
                <input name="new-account-email" type="text"/>
                <input name="register" type="submit" value="Înregistrare"/>
            </form>
        </div>
        <div className="login">
            <form>
                <h1>Am cont</h1>
                <label htmlFor="login-email">E-mail</label>
                <input name="login-email" type="text"/>
                <label htmlFor="login-password">Parolă</label>
                <input name="login-password" type="password"/>
                <div className="checkbox">
                    <input name="login-remember" type="checkbox"/>
                    <label htmlFor="login-remember">Vreau să rămân logat</label>
                </div>
                <input name="login" type="submit" value="Login"/>
            </form>
        </div>
    </main>
  );
};

const Profile = () => {
  return (
    <main className="band-profile">
      <form>
          <section className="details">
              <h1>Detalii trupă</h1>

              <label htmlFor="band-name">Nume</label>
              <input name="band-name" type="text"/>

              <label htmlFor="band-founded">An înființare</label>
              <input name="band-founded" type="text"/>

              <label htmlFor="band-picture">Poză profil</label>
              <input name="band-picture" type="button" className="upload" value="Upload"/>

              <label htmlFor="band-description">Descriere</label>
              <textarea name="band-description"></textarea>

              <label htmlFor="band-city">Oraș reședință</label>
              <input name="band-city" type="text"/>
          </section>
          <section className="members">
              <h1>Membri</h1>
              <table>
                <tbody>
                  <tr>
                      <td className="name">Florin Popescu</td>
                      <td className="fb-profile"><a href="">https://www.facebook.com/florinpopescu</a></td>
                      <td className="edit"><a href="">Modifică</a></td>
                      <td className="delete"><a href="">Șterge</a></td>
                  </tr>
                  <tr>
                      <td className="name">Ion Ionescu</td>
                      <td className="fb-profile"><a href="">https://www.facebook.com/ionescu96</a></td>
                      <td className="edit"><a href="">Modifică</a></td>
                      <td className="delete"><a href="">Șterge</a></td>
                  </tr>
                  <tr>
                      <td className="name">Andrei Carambol</td>
                      <td className="fb-profile"><a href="">https://www.facebook.com/carambol</a></td>
                      <td className="edit"><a href="">Modifică</a></td>
                      <td className="delete"><a href="">Șterge</a></td>
                  </tr>
                  <tr>
                      <td className="name">Corina Alina</td>
                      <td className="fb-profile"><a href="">https://www.facebook.com/corinalina</a></td>
                      <td className="edit"><a href="">Modifică</a></td>
                      <td className="delete"><a href="">Șterge</a></td>
                  </tr>
                </tbody>
              </table>
          </section>
          <section className="actions">
              <input name="login" type="submit" value="Salvare"/>
          </section>
      </form>
    </main>
  );
}

const MyBand = ({isLoggedIn, bandInfo, dispatch}) => {
  if(!isLoggedIn){
    return <Login dispatch={dispatch} />
  }
  return <Profile dispatch={dispatch} />;
};

function mapStateToProps(state){
  return state.myBand;
}

export default connect(mapStateToProps)(MyBand);
