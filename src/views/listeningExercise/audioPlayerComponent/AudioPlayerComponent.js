import React from 'react';
import './AudioPlayerComponent.scss';
import image from './images/audio2.png';
import TranslatorButton from '../../../components/translatorButton/translatorButton';

const SOUNDCLOUD_URL_PREFIX = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/';
const SOUNDCLOUD_URL_PARAMS = '&color=639B56&amp;auto_play=false&amp;buying=false&amp;liking=false&amp;download=false&amp;sharing=false&amp;show_comments=false&amp;show_playcount=false&amp;show_user=false&amp;show_artwork=false';

class AudioPlayerComponent extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      showText: false,
    };
  }

  handleShowText = (event) => {
    this.setState({ showText: true });
  };

  handleHideText = (event) => {
    this.setState({ showText: false });
  };

  render() {
    const link = `${SOUNDCLOUD_URL_PREFIX}${this.props.exerciseData.audioId}${SOUNDCLOUD_URL_PARAMS}`;

    return (


      <div className="AudioPlayerComponent">
        <div className="AudioPlayerComponent__image">
          <div className="AudioPlayerComponent__image__text">
                Listen this audio...
          </div>
        </div>
        <iframe
          title={this.props.exerciseData.audioTitle}
          width="100%"
          height="125"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src={link}
        />
        <div className="AudioPlayerComponent__translationText">
          {this.state.showText
            ? (
              <div>
                <TranslatorButton action={this.handleHideText} label="Hide text" />
                <p>{this.props.exerciseData.audioText}</p>

              </div>
            )
            : (
              <TranslatorButton action={this.handleShowText} label="Show translation text" />
            )
            }

        </div>
      </div>
    );
  }
}

export default AudioPlayerComponent;
