import React, { Component } from "react";
import "./ChatRoom.css";
import Card from "./Card";
import '@fortawesome/fontawesome-free/css/all.min.css';

class App extends Component {
  state = {
    categories: {
      wentWell: [],
      toImprove: [],
      actionItems: []
    },
    userInput: "",
    id: 0,
    Cards: [],
    likes: 0,
    dislikes: 0
  };

  userInput = (e, idx) => {
    let newCards = [...this.state.Cards];
    newCards[idx].input = e.target.value;
    this.setState({
      Cards: newCards
    });
  };

  validateInput = e => {
    if (e.target.value === "") {
      window.alert("input required");
    }
  };
  
  Delete = id => {
    this.setState({
      Cards: this.state.Cards.filter(card => card.id !== id)
    });
  };

  CreateCard = (type, input) => {
    this.setState({
      Cards: [
        ...this.state.Cards,
        {
          id: this.state.id,
          type: type,
          input: input,
          likes: 0,
          dislikes: 0
        }
      ],
      id: this.state.id + 1
    });
  };

  MoveLeft = (id, idx) => {
    let newCards = [...this.state.Cards];
    for (let card of newCards) {
      if (card.id === id && card.type === "Went Well") {
        card.type = "Action Items";
      } else if (card.id === id && card.type === "To Improve") {
        card.type = "Went Well";
      } else if (card.id === id && card.type === "Action Items") {
        card.type = "To Improve";
      }
    }
    newCards.push(newCards[idx]);
    newCards.splice(idx, 1);
    this.setState({
      Cards: newCards
    });
  };

  MoveRight = (id, idx) => {
    let newCards = [...this.state.Cards];
    for (let card of newCards) {
      if (card.id === id && card.type === "Went Well") {
        card.type = "To Improve";
      } else if (card.id === id && card.type === "To Improve") {
        card.type = "Action Items";
      } else if (card.id === id && card.type === "Action Items") {
        card.type = "Went Well";
      }
    }
    newCards.push(newCards[idx]);
    newCards.splice(idx, 1);
    this.setState({
      Cards: newCards
    });
  };

  handleLikes = idx => {
    let newCards = [...this.state.Cards];
    newCards[idx].likes++;
    this.setState({
      Cards: newCards
    });
  };

  handleDislikes = idx => {
    let newCards = [...this.state.Cards];
    newCards[idx].dislikes++;
    this.setState({
      Cards: newCards
    });
  };
  
  render() {
    return (
      <div className="App">
        <h2>Retro Board</h2> <br />
        <div className="text-center">
          <div className="row">
            <div>
              <h4>What Went Well</h4>
              <button
                type="button"
                className="addButton"
                onClick={() => this.CreateCard("Went Well", "")}
              >
                +
              </button>
              {this.state.Cards.map((card, idx) => {
                if (card.type === "Went Well") {
                  return (
                    <Card
                      key={"Went Well" + idx}
                      idx={idx}
                      cardId={card.id}
                      value={card.input}
                      userInput={this.userInput}
                      validateInput={this.validateInput}
                      MoveLeft={this.MoveLeft}
                      Delete={this.Delete}
                      MoveRight={this.MoveRight}
                      likesCount={card.likes}
                      dislikesCount={card.dislikes}
                      handleLikes={this.handleLikes}
                      handleDislikes={this.handleDislikes}
                      color={"wentWell"}
                    />
                  );
                } else {
                  return null;
                }
              })}
            </div>
            <div>
              <h4>What Went Wrong</h4>
              <button
                type="button"
                className="addButton"
                onClick={() => this.CreateCard("To Improve", "")}
              >
                +
              </button>
              {this.state.Cards.map((card, idx) => {
                if (card.type === "To Improve") {
                  return (
                    <Card
                      key={"To Improve" + idx}
                      idx={idx}
                      cardId={card.id}
                      value={card.input}
                      userInput={this.userInput}
                      validateInput={this.validateInput}
                      MoveLeft={this.MoveLeft}
                      Delete={this.Delete}
                      MoveRight={this.MoveRight}
                      likesCount={card.likes}
                      dislikesCount={card.dislikes}
                      handleLikes={this.handleLikes}
                      handleDislikes={this.handleDislikes}
                      color={"toImprove"}
                    />
                  );
                } else {
                  return null;
                }
              })}
            </div>
            <div>
              <h4>Action Items</h4>
              <button
                type="button"
                className="addButton"
                onClick={() => this.CreateCard("Action Items", "")}
              >
                +
              </button>
              {this.state.Cards.map((card, idx) => {
                if (card.type === "Action Items") {
                  return (
                    <Card
                      key={"Action Items" + idx}
                      idx={idx}
                      cardId={card.id}
                      value={card.input}
                      userInput={this.userInput}
                      validateInput={this.validateInput}
                      MoveLeft={this.MoveLeft}
                      Delete={this.Delete}
                      MoveRight={this.MoveRight}
                      likesCount={card.likes}
                      dislikesCount={card.dislikes}
                      handleLikes={this.handleLikes}
                      handleDislikes={this.handleDislikes}
                      color={"actionItems"}
                    />
                  );
                } else {
                  return null;
                }
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
