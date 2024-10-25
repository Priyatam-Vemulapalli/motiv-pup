// styles.js

const ChatbotStyles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: 'pink', 
    },
    chatWrapper: {
      width: '350px',
      height: '500px',
      backgroundColor: '#fff',
      borderRadius: '16px',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
      overflow: 'hidden',
    },
    header: {
      backgroundColor: '#7e5bef', 
      padding: '10px',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderTopLeftRadius: '16px',
      borderTopRightRadius: '16px',
    },
    username: {
      fontSize: '16px',
      marginLeft: '10px',
      fontWeight: 'bold',
    },
    chatWindow: {
        flex: 1,
        padding: '10px',
        overflowY: 'scroll', 
        display: 'flex',
        flexDirection: 'column',
        // The next two lines hides the scrollbar
        scrollbarWidth: 'none',
        msOverflowStyle: 'none', 
      },
    userMessage: {
      alignSelf: 'flex-end',
      backgroundColor: '#dcf8c6',
      padding: '8px',
      borderRadius: '16px 0px 16px 16px',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
      margin: '5px',
      maxWidth: '70%',
    },
    botMessage: {
      alignSelf: 'flex-start',
      backgroundColor: '#f1f0f0',
      padding: '8px',
      borderRadius: '0px 16px 16px 16px',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
      margin: '5px',
      maxWidth: '70%',
    },
    inputContainer: {
      display: 'flex',
      alignItems: 'center',
      padding: '10px',
      borderTop: '1px solid #ddd',
    },
    input: {
      flex: 1,
      padding: '10px',
      borderRadius: '24px',
      border: '0.1px solid #ddd',
      marginRight: '10px',
    },
    button: {
      backgroundColor: '#7e5bef',
      color: 'white',
      padding: '10px',
      borderRadius: '20px',
      border: 'none',
      cursor: 'pointer',
    },
    closeButton: {
      backgroundColor: '#7e5bef',
      borderRadius: '50%',
      padding: '10px',
      color: 'white',
      cursor: 'pointer',
    },
  };
  
  export default ChatbotStyles;
  