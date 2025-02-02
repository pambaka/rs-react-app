import './results-section.css';
import Cards from '../cards/cards';
import { Character } from '../types';
import { Component, ReactNode } from 'react';

class ResultsSection extends Component<{ results: Character[] | undefined }> {
  private renderContent(res: Character[] | undefined): ReactNode {
    if (!res)
      return (
        <div className="message">Something went wrong. Please try again.</div>
      );
    else if (res.length === 0)
      return <div className="message">Nothing was found :(</div>;
    else return <Cards people={this.props.results}></Cards>;
  }

  render(): ReactNode {
    return (
      <section className="results-section">
        {this.renderContent(this.props.results)}
      </section>
    );
  }
}

export default ResultsSection;
