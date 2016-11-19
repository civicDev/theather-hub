import React from "react";
import {connect} from "react-redux";
import {saveProfileAction} from "../actions/myBand";


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

const Member = ({id, name, fbProfile}) => {
  return (
    <tr>
      <td className="name">{name}</td>
      <td className="fb-profile"><a href="">{fbProfile}</a></td>
      <td className="edit"><a href="">Modifică</a></td>
      <td className="delete"><a href="">Șterge</a></td>
    </tr>
  );
};

const MembersList = ({members}) => {

  return (
    <section className="members">
        <h1>Membri</h1>
        <table>
          <tbody>
              {members.map(member => <Member key={member.id} name={member.name} fbProfile={member.fbProfile} />)}
          </tbody>
        </table>
    </section>
  );
};


function preventDefault(next){
  return function(e){
    e.preventDefault();
    return next(e);
  };
}

class Profile extends React.Component{
  constructor(){
    super();
    this.nameInput = null;
    this.descriptionInput = null;
    this.foundingYearInput = null;
    this.cityOfResidenceInput = null;
  }
  saveProfile(){
    const {dispatch} = this.props;
    const payload = {
      name : this.nameInput.value,
      description : this.descriptionInput.value,
      foundingYear : this.foundingYearInput.value,
      cityOfResidence : this.cityOfResidenceInput.value
    };
    dispatch(saveProfileAction(payload));
  }
  render(){
    const {members, name, description, pictureLink, foundingYear, cityOfResidence} = this.props.bandProfile;
    return (
      <main className="band-profile">
        <form>
            <section className="details">
                <h1>Detalii trupă</h1>

                <label htmlFor="band-name">Nume</label>
                <input name="band-name" ref={(input)=>this.nameInput = input} value={name} type="text"/>

                <label htmlFor="band-founded">An înființare</label>
                <input name="band-founded" ref={(input)=>this.foundingYearInput = input} value={foundingYear} type="text"/>

                <label htmlFor="band-picture">Poză profil</label>
                {pictureLink ? <img src={pictureLink} /> : null}
                <input name="band-picture" type="button" className="upload" value="Upload"/>

                <label htmlFor="band-description">Descriere</label>
                <textarea name="band-description" ref={(input)=>this.descriptionInput = input} defaultValue={description}></textarea>

                <label htmlFor="band-city">Oraș reședință</label>
                <input name="band-city" ref={(input)=>this.cityOfResidenceInput = input} value={cityOfResidence} type="text"/>
            </section>
            <MembersList members={members} />
            <section className="actions">
                <input onClick={preventDefault((e)=> this.saveProfile())} name="login" type="submit" value="Salvare"/>
            </section>
        </form>
      </main>
    );
  }
}

const MyBand = ({isLoggedIn, loading, bandInfo, dispatch}) => {
  if(!isLoggedIn){
    return <Login dispatch={dispatch} />
  }
  const m = [{
    id : 0,
    name : "Florin Popescu",
    fbProfile : "https://www.facebook.com/florinpopescu"
  },{
    id : 1,
    name : "Ion Ionescu",
    fbProfile : "https://www.facebook.com/ionescu96"
  },{
    id : 2,
    name : "Andrei Carambol",
    fbProfile : "https://www.facebook.com/carambol"
  }];

  if(loading){
    return <main className="band-profile">Loading...</main>;
  }

  return <Profile dispatch={dispatch} bandProfile={{members : m}} />;
};

function mapStateToProps(state){
  return state.myBand;
}

export default connect(mapStateToProps)(MyBand);
