import React from 'react';
import './AudioPlayerComponent.scss';
import image from './images/audio2.png';


class AudioPlayerComponent extends React.PureComponent {
  render() {
    return (
      <div className="AudioPlayerComponent">
        <div className="AudioPlayerComponent__image">
          <img src={image} alt="Listening..." />
          <div className="AudioPlayerComponent__image__text">
                Listen this audio...
          </div>
        </div>
        <audio className="AudioPlayerComponent__recorder" id="audioPlayback" controls="" autoPlay>
          <track kind="captions" />
          <source id="audioSource" type="audio/mp3" src={this.props.exerciseData.linkForAudio} />
        </audio>
      </div>
    );
  }
}

export default AudioPlayerComponent;
