import React from 'react'
import { Modal, Button } from 'antd';

class AccessibilityStatement extends React.Component {
  state = { visible: false }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  toggleModal = (e) => {
    this.setState({
      visible: !this.state.visible,
    });
  }

  render() {
    return (
      <div>
        <a href='#' onClick={this.toggleModal}>
          Accessibility Statement
        </a>
        <Modal
          title="Accessibility Statement"
          visible={this.state.visible}
          onCancel={this.toggleModal}
          footer={
            <Button 
              onClick={this.toggleModal}
              type='primary'
              >
              Ok
            </Button>
          }
        >
          <h4>Our aim</h4>
          <p>We want everyone to be able to use the Great Stour Flood Dashboard regardless of their computer knowledge or disabilities. We have designed the dashboard to be as accessible as possible, in accordance with guidelines laid down by the <a href='https://www.w3.org/WAI/' target='_blank' rel='noopener noreferrer'>Web Accessibility Initiative (WAI)</a>.</p>
          <br />
          <h4>Our commitment to accessibility</h4>
          <p>We aim for our site to meet the standards laid out in the <a href='https://www.w3.org/WAI/standards-guidelines/wcag/' target='_blank' rel='noopener noreferrer'>Web Content Accessibility Guidelines (WCAG 2.1) to Level AA standard.</a></p>
          <p>Our site is developed using valid HTML and cascading style sheets (CSS). The content is separated from presentational elements, which makes it available to any visitors that use technologies such as a screen reader or text-only browser.</p>
          <p>We strive to achieve and maintain levels of accessibility that conform to the standard, but may unintentionally publish content that does not meet all of the guidelines required for the standard.</p>
          <h4>Compatibility with tools</h4>
          <p>Our site is designed to be compatible with recent versions of the following screen readers:
            <ul>
              <li>Mac OSX Voiceover</li>
              <li>NVDA screen reader</li>
            </ul>
          </p>
          <h4>Help with seeing the page</h4>
          <p>Most internet browsers, such as Internet Explorer or Safari, allow you to force the text on a webpage to be the size and colour you want.</p>
          <p>Many operating systems also come with a built-in screen magnifier that allows you to enlarge a portion of the page to several times the original size.</p>
          <p>Help on adjusting your computer settings can be viewed on the <a href='https://mcmw.abilitynet.org.uk/impairment/vision-seeing-screen' target='_blank' rel='noopener noreferrer'>AbilityNet website</a>.</p>
          <h4>Help with keyboard and mouse</h4>
          <p>If you can use a mouse, but find it difficult, there are ways to make your mouse easier to use.</p>
          <p>Further information on using your keyboard and mouse can also be found on the <a href='https://mcmw.abilitynet.org.uk/impairment/motor-keyboard-and-mouse' target='_blank' rel='noopener noreferrer'>AbilityNet website</a>.</p>
          <p className='float-right small'>Accessibility statement based on template from <a href='https://www.kitc-solutions.co.uk/' target='_blank' rel='noopener noreferrer'>KITC</a></p>
        </Modal>
      </div>
    );
  }
}

export default AccessibilityStatement