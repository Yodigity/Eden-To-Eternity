export default {
  palette: {
    primary: {
      light: "#72cff8",
      main: "#4fc3f7",
      dark: "#3788ac",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ea605d",
      main: "#e53935",
      dark: "#a02725",
      contrastText: "#fff",
    },
  },
  spreadIt: {
    container: {
      alignContent: "center",
      margin: 20,
    },
    card: {
      position: "relative",
      display: "flex",
      margin: 20,
    },
    header: {
      backgroundColor: "lightBlue",
      margin: 0,
    },
    image: {
      margin: "auto",
    },
    content: {
      padding: 25,
      objectFit: "cover",
    },

    paper: {
      marginTop: 15,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },

    title: {
      margin: 15,
    },

    typography: {
      fontSize: 16,
      textAlign: "center",
      useNextVariants: true,
    },

    textField: {
      padding: 5,
      margin: 15,
      display: "flex",
      background: "white",
      borderRadius: 15,
      fontSize: 1.1,
    },

    button: {
      background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
      border: 0,
      borderRadius: 3,
      boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
      fontSize: 16,
      display: "block",
      height: 48,
      padding: "0 30px",
      margin: "auto",
      alignContent: "center",
      marginBottom: 25,
    },

    invisibleSeparator: {
      border: "none",
      margin: 4,
    },
    visibleSeparator: {
      width: "100%",
      borderBottom: "1px, solid, rgba(0,0,0,0.1)",
      marginBottom: "20px",
    },
    profile: {
      "& .image-wrapper": {
        textAlign: "center",
        position: "relative",
        "& button": {
          position: "absolute",
          top: "80%",
          left: "70%",
        },
      },
      "& .profile-image": {
        width: 200,
        height: 200,
        objectFit: "cover",
        maxWidth: "100%",
        borderRadius: "50%",
      },
      "& .profile-details": {
        textAlign: "center",
        "& span, svg": {
          verticalAlign: "middle",
        },
        "& a": {
          color: "#00bcd4",
        },
      },
      "& hr": {
        border: "none",
        margin: "0 0 10px 0",
      },
      "& svg.button": {
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    buttons: {
      textAlign: "center",
      "& a": {
        margin: "20px 10px",
      },
    },
  },
};
