class Traverse {
  constructor() {
    this.home = {
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
        work: '',
        projects: '',
        skills: '',
      },

    };
    this.prevPath = [];
    this.path = [];
  }

  ls() {
    let ans = this.home;
    for (let i of this.path) {
      ans = ans.value[i];
    }
    if (ans.type === 'directory') {
      return ans.value;
    } else {
      return 'Not a directory';
    }
  }

  cat() {
    let ans = this.obj;
    for (let i of this.path) {
      ans = ans.value[i];
    }
    if (ans.type === 'file') {
      console.log(ans.value);
    } else {
      console.log('cant cat a dir');
    }

  }

  pwd() {
    return '~/' + this.path.join('/');
  }

  cd(name) {
    if (name === '..') {
      this.prevPath = JSON.parse(JSON.stringify(this.path));
      this.path.pop();
    } else if (name === '.') {
      // directory remains unchanged
    } else if (name === '-') {
      const temp = JSON.parse(JSON.stringify(this.prevPath));
      this.prevPath = JSON.parse(JSON.stringify(this.path));
      this.path = JSON.parse(JSON.stringify(temp));
    } else {
      this.prevPath = JSON.parse(JSON.stringify(this.path));
      name = name.split('/');
      let ans = [...this.path, ...name];
      let tempObj = JSON.parse(JSON.stringify(this.home))
      for (let i of ans) {
        tempObj = tempObj.value[i];
      }
      if (tempObj.type === 'file') {
        console.log('cant cd to file');
      } else {
        this.path = [...this.path, ...name]
      }
    }
    return {};
  }

}


/*


function traverse() {
    let obj = {
        type: 'directory',
        value: {
            about: {
                type: 'directory',
                value: {
                    info: {
                        type: 'file',
                        value: 'Hi i am Stuart'
                    },
                }
            },
            contact: {
                type: 'directory',
                value: {
                    github: {
                        type: 'directory',
                        value: 'gitlink'
                    },
                    facebook: {
                        type: 'file',
                        value: 'fblink'
                    },
                    youtube: {
                        type: 'file',
                        value: 'ytlink'
                    }
                }
            },
            work: '',
            projects: '',
            skills: ''
        }

    }
    let prevPath = [];
    let path = [];
    return {
        ls() {
            let ans = obj;
            for (let i of path) {
                ans = ans.value[i];
            }
            if (ans.type === 'directory') {
                console.log(ans.value)
            } else {
                console.log('Not a directory');
            }

        },
        cat() {
            let ans = obj;
            for (let i of path) {
                ans = ans.value[i];
            }
            if (ans.type === 'file') {
                console.log(ans.value)
            } else {
                console.log('cant cat a dir');
            }

        },
        pwd() {
            console.log('~/' + path.join('/'));
        },
        cd(name) {
            if (name === '..') {
                prevPath = JSON.parse(JSON.stringify(path));
                path.pop();
            } else if (name === '.') {
                // directory remains unchanged
            } else if (name === '-') {
                let temp = JSON.parse(JSON.stringify(prevPath));
                prevPath = JSON.parse(JSON.stringify(path));
                path = JSON.parse(JSON.stringify(temp));
            } else {
                prevPath = JSON.parse(JSON.stringify(path));
                name = name.split('/');
                let ans = [...path, ...name];
                let tempObj = JSON.parse(JSON.stringify(obj))
                for (let i of ans) {
                    tempObj = tempObj.value[i];
                }
                if (tempObj.type === 'file') {
                    console.log('cant cd to file');
                } else {
                    path = [...path, ...name]
                }


            }

        }
    }
}

let temp = traverse();
temp.cd('contact/github')
temp.ls();
temp.pwd();
temp.cd('..')
temp.ls();
temp.pwd();
// temp.cd('info');
// temp.pwd();
// temp.cat();


/*
In CD
    check for valid path
    check for ... or other chars
    after split check if obj returns anythig,,,, else throw error
    handle trailing slash
    handle ../xyz
    

In OBJ
    define structre
        type - directory/ link / file
        value- actual value

In ls
    -a - add fun

*/

export default Traverse;
