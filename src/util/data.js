const obj = {
  type: 'directory',
  value: {
    about: {
      type: 'directory',
      value: {
        info: {
          type: 'file',
          value: 'Hi i am Stuart',
        },
      },
    },
    contact: {
      type: 'directory',
      value: {
        github: {
          type: 'directory',
          value: 'gitlink',
        },
        facebook: {
          type: 'file',
          value: 'fblink',
        },
        youtube: {
          type: 'file',
          value: 'ytlink',
        },
      },
    },
    // work: '',
    // projects: '',
    // skills: '',
  },

};

export default obj;
