function ProfileEditForm (state) {

  this.state = { ...state };

  const selectors = {
    page: '.page',
    popup: '.popup',
    popupOpenClass: 'popup_opened',
    form: '.profile-form',
    nameInput: '.profile-form__name',
    occupationInput: '.profile-form__occupation',
    closeButton: '.profile-form__close-btn',
  };

  const disableScrolling = () => {
    const x=window.scrollX;
    const y=window.scrollY;
    window.onscroll=function(){window.scrollTo(x, y);};
  }

  const enableScrolling = () => {
    window.onscroll=function(){};
  }

  const renderPopup = (enabled) => {
    const popupElement = document.querySelector(selectors.popup);

    if (enabled) {
      popupElement.classList.add(selectors.popupOpenClass);
      disableScrolling();
      return;
    }

    popupElement.classList.remove(selectors.popupOpenClass);
    enableScrolling();
  };

  const renderInput = ( formElement, selector, value ) => {
    const inputElement = formElement.querySelector(selector);
    inputElement.value = value;
  }

  const renderName = ( formElement, name ) => {
    renderInput(formElement, selectors.nameInput, name);
  }

  const renderOccupation = ( formElement, occupation ) => {
    renderInput(formElement, selectors.occupationInput, occupation);
  }

  this.render = () => {
    renderPopup(this.state.enabled);
    if (this.state.enabled) {
      const formElement = document.querySelector(selectors.form);
      renderName(formElement, this.state.profile.name);
      renderOccupation(formElement, this.state.profile.occupation);
    }
  }

  this.setProfile = (profile) => {
    this.state.profile = profile;
  }

  const updateState = () => {
    const formElement = document.querySelector(selectors.form);
    this.state.profile = {
      name: formElement.querySelector(selectors.nameInput).value,
      occupation: formElement.querySelector(selectors.occupationInput).value
    };
  }

  this.show = () => {
    this.state.enabled = true;
    this.render();
  }

  this.hide = () => {
    this.state.enabled = false;
    this.render();
  }

  const bind = () => {
    const formElement = document.querySelector(selectors.form);
    const closeButton = formElement.querySelector(selectors.closeButton);
    closeButton.addEventListener( 'click', this.hide );

    formElement.addEventListener( 'submit', (event) => {
      event.preventDefault();
      updateState();
      this.onSave(this.state.profile);
    });
  }

  this.onSave = (profile) => {
    console.dir(profile);
  }

  bind();
  this.render();
}

function ProfileInfo(state) {

  this.state = { ...state };

  const selectors = {
    name: '.profile__info-name',
    occupation: '.profile__info-occupation',
    avatar: '.profile__avatar',
    editButton: '.profile__edit-btn',
    addButton: '.profile__add-btn'
  }

  const renderTextValue = (selector, value) => {
    const textElement = document.querySelector(selector);
    textElement.textContent = value;
  }

  const renderName = (name) => {
    renderTextValue(selectors.name, name);
  }

  const renderOccupation = (occupation) => {
    renderTextValue(selectors.occupation, occupation);
  }

  this.render = () => {
    renderName(this.state.profile.name);
    renderOccupation(this.state.profile.occupation);
  }

  const bind = () => {
    const editButton = document.querySelector(selectors.editButton);
    editButton.addEventListener( 'click', () => {
      this.onEdit(this.state.profile);
    } )
  }

  this.setProfile = (profile) => {
    this.state.profile = profile;
  }

  this.onEdit = (profile) => {
     console.dir(profile);
  };

  bind();
  this.render();
}

const profile = {
  name: "Жак-Ив Кусто",
  occupation: "Исследователь океана"
};

const initialize = () => {
  const profileEditForm = new ProfileEditForm( { profile, enable: false });
  const profileInfo = new ProfileInfo({ profile });

  profileInfo.onEdit = (profile) => {
    profileEditForm.setProfile(profile);
    profileEditForm.show();
  }

  profileEditForm.onSave = (profile) => {
    profileInfo.setProfile(profile);
    profileInfo.render();
    profileEditForm.hide();
  }
}

initialize();