const obj = {
  type: 'directory',
  value: {
    about: {
      type: 'directory',
      value: {
        'info.txt': {
          type: 'file',
          value: `Hey there hacker, I am Rishabh, a software engineer from India.
                   I am mostly passionate about web technologies, linux and everthing opensource`,
        },
        credits: {
          type: 'directory',
          value: {
            'thanks.txt': {
              type: 'file',
              value: `Would like to take a moment to thank Nitin and Andrew for all their help 
              with extensive testing and code review `,
            },
          },
        },
      },
    },
    contact: {
      type: 'directory',
      value: {
        'blog.sh': {
          type: 'link',
          value: 'https://rishabh1403.com/',
        },
        'email.sh': {
          type: 'link',
          email: true,
          value: 'contact@rishabh1403.com',
        },
        'github.sh': {
          type: 'link',
          value: 'https://github.com/rishabh1403/',
        },
        'twitter.sh': {
          type: 'link',
          value: 'https://twitter.com/rishabhjain1403',
        },
        'youtube.sh': {
          type: 'link',
          value: 'https://www.youtube.com/rishabh1403',
        },
      },
    },
    skills: {
      type: 'directory',
      value: {
        javascript: {
          type: 'file',
          value: '(Intermediate)',
        },
        Html: {
          type: 'file',
          value: '(Intermediate)',
        },
        css: {
          type: 'file',
          value: '(Intermediate)',
        },
        React: {
          type: 'file',
          value: '(Intermediate)',
        },
        Node: {
          type: 'file',
          value: '(Intermediate)',
        },
      },
    },
    work: {
      type: 'directory',
      value: {
        Mappes: {
          type: 'directory',
          value: {
            stack: {
              type: 'file',
              value: 'Node, React & DynamoDb',
            },
          },
        },
        Aikaan: {
          type: 'directory',
          value: {
            stack: {
              type: 'file',
              value: 'Node, Golang, React & PostgreSql',
            },
          },
        },
        Tricog: {
          type: 'directory',
          value: {
            stack: {
              type: 'file',
              value: 'Node, Angular & Sql',
            },
          },
        },
        Sportzify: {
          type: 'directory',
          value: {
            stack: {
              type: 'file',
              value: 'Node, Jquery & MongoDb',
            },
          },
        },
      },
    },
    // projects: '',
  },

};

export default obj;
