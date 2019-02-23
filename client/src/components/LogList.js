import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { getLogsQuery, deleteLogMutation } from "../queries/queries";
import AddLog from "./AddLog";
//import dialog
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class LogList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      logId: "",
      open: false
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  displayLogs() {
    var data = this.props.data;
    if (data.loading) {
      return <div>Loading logs...</div>;
    } else {
      /*
      // return an array of array
      return data.logs.map(date => {
        // return an array of <li> logName </li> for each date
        return date.logs.map(theLog => {
          return <li key={theLog.id}> {theLog.logName}</li>;
        });
      });*/
      return data.logs.map(date => {
        return (
          <div>
            <h1>{date.dateName}</h1>
            <h4 id="logh4">
              {date.logs.map(theLog => {
                return (
                  <div style={{ position: "relative" }} id="logs">
                    <li key={theLog.id}> {theLog.logName}</li>
                    <button
                      id="log-button"
                      onClick={this.deleteLog.bind(
                        this,
                        theLog.id,
                        date.dateName
                      )}
                    >
                      -
                    </button>
                  </div>
                );
              })}
            </h4>
          </div>
        );
      });
    }
  }

  deleteLog(id, dateName) {
    console.log("This id is: " + id);
    this.props.deleteLogMutation({
      variables: {
        logId: id,
        dateName: dateName
      },
      refetchQueries: [{ query: getLogsQuery }]
    });
    console.log("This function was run");
  }

  render() {
    return (
      <div id="log-list">
        {this.displayLogs()}
        <li id="log-for-add">
          <button id="add-log-button" onClick={this.handleClickOpen}>
            Add a log
          </button>
        </li>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          {/*<DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Subscribe
            </Button>
          </DialogActions>*/}
          <AddLog />
        </Dialog>
      </div>
    );
  }
}

//export default graphql(getLogsQuery)(LogList);
/*export default compose(
  graphql(getLogsQuery, { name: "getLogsQuery" }),
  graphql(deleteLogMutation, { name: "deleteLogMutation" })
)(LogList);*/

export default compose(
  graphql(getLogsQuery),
  graphql(deleteLogMutation, { name: "deleteLogMutation" })
)(LogList);
