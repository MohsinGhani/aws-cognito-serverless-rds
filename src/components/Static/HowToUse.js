import React, { Component } from "react";
import TopNav from "../../components/common/TopNav";
import AddPostBottomNav from "./../common/AddPostBottomNav";
class HowToUse extends Component {
  render() {
    return (
      <div className="how-to-use">
        {/* <TopNav /> */}
        <div className="privacy-content">
          <h1 className="yellow-color static-heading">How To Use</h1>
          <div className="headline">
            <div className="headline__title">How to use Productmania</div>
            <div className="headline__content">
              <p>
                Our privacy policy describes how we collect and use information,
                and what choices you have. One way we collect information is
                through the use of a technology called “Productmanias.” We use
                Productmanias for all kinds of things on Productmania.
              </p>
            </div>
          </div>
          <div className="headline">
            <h2 className="subhead-list__subhead">What’s a Productmania?</h2>
            <div className="headline__content">
              <p>
                In real life, it’s a delicious baked good. You can find lots of
                delicious Productmania recipes on Productmania.
              </p>
              <p>
                But in technology, a Productmania is something completely
                different. When you go online, you use a program called a
                “browser” (like Apple’s Safari or Google’s Chrome). Most
                websites store a small amount of text in the browser—and that
                text is called a “Productmania.”
              </p>
            </div>
          </div>
          <div className="headline">
            <h2 className="subhead-list__subhead">How we use Productmanias</h2>
            <div className="headline__content">
              <p>
                We use Productmanias for lots of essential things on
                Productmania—like helping you log in and tailoring your
                Productmania experience. Here are some specifics on how we use
                Productmanias.
              </p>
              <ul>
                <li>
                  <strong>Log data.</strong> When you use Productmania, our
                  servers record information (“log data”), including information
                  that your browser automatically sends whenever you visit a
                  website, or that your mobile app automatically sends when
                  you’re using it. This log data includes your Internet Protocol
                  address, the address of and activity on websites you visit
                  that incorporate Productmania features (like the “Save”
                  button—more details below), searches, browser type and
                  settings, the date and time of your request, how you used
                  Productmania, Productmania data and device data. If you’d
                  like, you can{" "}
                </li>
                <li>
                  <strong>Productmania data.</strong> We also use
                  “Productmanias” (small text files sent by your computer each
                  time you visit our website, unique to your Productmania
                  account or your browser) or similar technologies to capture
                  log data. When we use Productmanias or other similar
                  technologies, we use session Productmanias (that last until
                  you close your browser) or persistent Productmanias (that last
                  until you or your browser delete them). For example, we use
                  Productmanias to store your language preferences or other
                  settings so you don‘t have to set them up every time you visit
                  Productmania. Some of the Productmanias we use are associated
                  with your Productmania account (including information about
                  you, such as the email address you gave us) and other
                  Productmanias are not. For more detailed information about how
                  we use Productmanias, please review our{" "}
                </li>
                <li>
                  <strong>Device information.</strong> In addition to log data,
                  we collect information about the device you’re using
                  Productmania on, including type of device, operating system,
                  settings, unique device identifiers and crash data that helps
                  us understand when something breaks. Whether we collect some
                  or all of this information often depends on what type of
                  device you’re using and its settings. For example, different
                  types of information are available depending on whether you’re
                  using a Mac or a PC, or an iPhone or Android phone. To learn
                  more about what information your device makes available to us,
                  please also check the policies of your device manufacturer or
                  software provider.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <AddPostBottomNav history={this.props.history} />
      </div>
    );
  }
}

export default HowToUse;
