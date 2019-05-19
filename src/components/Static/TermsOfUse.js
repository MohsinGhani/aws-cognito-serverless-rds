import React, { Component } from 'react';
import TopNav from '../../components/common/TopNav'
class TermOfUse extends Component {

  render() {
    return (
      <div className="terms">
        <TopNav />
        <div className="privacy-content">
          <h1 className="yellow-color static-heading">Terms of service</h1>
          <div className="headline">
            <div className="headline__title">Thank you for using Productmania!</div>
            <div className="headline__content">
              <p>These Terms of Service ("Terms") govern your access to and use of the Productmania website, apps, APIs, and widgets (“Productmania” or the “Service”). Please read these Terms carefully, and contact us if you have any questions. By accessing or using Productmania, you agree to be bound by these Terms, our Privacy Policy, our Cookies Policy and our Community Guidelines.</p>
              <p>Every company has its terms. These are ours.</p>
            </div>
          </div>
          <div className="headline">
            <h2 className="subhead-list__subhead">1. Our service</h2>
            <div className="headline__content">
              <p>Productmania helps you discover and do what you love. To do that, we show you things we think will be relevant, interesting and personal to you based on your onsite and offsite activity. To provide our Service, we need to be able to identify you and your interests. Some of the things we show you are promoted by advertisers. As part of our service we try to ensure that even promoted content is relevant and interesting to you. You can identify promoted content because it will be clearly labelled.</p>
              <p>Productmania helps you discover and do what you love. It’s customized to you. We need to know what you like to make everything on Productmania relevant to you.</p>
            </div>
          </div>
          <div className="headline">
            <h2 className="subhead-list__subhead">2. We also get technical information when you use Productmania</h2>
            <div className="headline__content">
              <p>Whenever you use any website, mobile application or other internet service, certain information gets created and logged automatically. The same is true when you use Productmania. Here are some of the types of information we collect:</p>
              <ul>
                <li><strong>Log data.</strong> When you use Productmania, our servers record information (“log data”), including information that your browser automatically sends whenever you visit a website, or that your mobile app automatically sends when you’re using it. This log data includes your Internet Protocol address, the address of and activity on websites you visit that incorporate Productmania features (like the “Save” button—more details below), searches, browser type and settings, the date and time of your request, how you used Productmania, cookie data and device data. If you’d like, you can </li>
                <li><strong>Cookie data.</strong>   We also use “cookies” (small text files sent by your computer each time you visit our website, unique to your Productmania account or your browser) or similar technologies to capture log data. When we use cookies or other similar technologies, we use session cookies (that last until you close your browser) or persistent cookies (that last until you or your browser delete them). For example, we use cookies to store your language preferences or other settings so you don‘t have to set them up every time you visit Productmania. Some of the cookies we use are associated with your Productmania account (including information about you, such as the email address you gave us) and other cookies are not. For more detailed information about how we use cookies, please review our </li>
                <li><strong>Device information.</strong>  In addition to log data, we collect information about the device you’re using Productmania on, including type of device, operating system, settings, unique device identifiers and crash data that helps us understand when something breaks. Whether we collect some or all of this information often depends on what type of device you’re using and its settings. For example, different types of information are available depending on whether you’re using a Mac or a PC, or an iPhone or Android phone. To learn more about what information your device makes available to us, please also check the policies of your device manufacturer or software provider.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TermOfUse;