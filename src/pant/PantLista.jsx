import React, { Component } from "react";
import { getAllPant, collectPant } from "../util/APIUtils";
import Pant from "./Pant";
import SimpleMap from "../map/SimpleMap";
import { unCollectPant } from "../util/APIUtils";

class PantLista extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      isSchool: false,
      pantList: []
    };
    this.loadPant = this.loadPant.bind(this);
    this.collectPant = this.collectPant.bind(this);
    this.unCollectPant = this.unCollectPant.bind(this);
  }

  componentDidMount() {
    this.loadPant();
  }

  componentWillUnmount() {
    this.setState({ pantList: null });
  }

  loadPant() {
    this.setState({
      isLoading: true
    });
    getAllPant()
      .then(response => {
        this.setState({
          pantList: response
        });
      })
      .then(() => {
        if (this.props.currentUser.schoolclass) {
          this.setState({ isLoading: false, isSchool: true });
        } else {
          this.setState({ isLoading: false });
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({
          isLoading: false
        });
      });
  }

  collectPant(id) {
    collectPant(id)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
  }

  unCollectPant(id) {
    unCollectPant(id)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const allPant = this.state.pantList.map((pant, index) => {
      return (
        <Pant
          pant={pant}
          unCollectPant={this.unCollectPant}
          collectPant={this.collectPant}
          isSchoolclass={this.state.isSchool}
          key={index}
        />
      );
    });

    if (this.state.isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <React.Fragment>
        {this.props.map &&
          <div className="googleMap">
            <SimpleMap unCollectPant={this.unCollectPant} collectPant={this.collectPant} pantLista={this.state.pantList} isSchoolclass={this.state.isSchool} />
          </div>}
        {!this.props.map &&
          <div className="mainContent">
            {allPant}
          </div>
        }
      </React.Fragment>
    );
  }
}

export default PantLista;
