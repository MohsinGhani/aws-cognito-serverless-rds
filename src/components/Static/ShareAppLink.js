import React, { Component } from 'react';
import TopNav from '../../components/common/TopNav'
import './index.css'
class ShareAppLink extends Component {

  render() {
    return (
      <div className="privacy">
        <TopNav />
        <div className="privacy-content">
          <h1 className="yellow-color static-heading">Share App Link</h1>
          <div className="headline">
            <div className="headline__title">Thank you for using Productmania!</div>
            <div className="headline__content">
              <p>Our mission is to help you discover and do what you love. To do that, we show you personalized content and ads we think you’ll be interested in based on information we collect from you and third parties. We only use that information where we have a proper legal basis for doing so. </p>
              <p>We wrote this policy to help you understand what information we collect, how we use it and what choices you have about it. Because we’re an internet company, some of the concepts below are a little technical, but we’ve tried our best to explain things in a simple and clear way. We welcome your  </p>
            </div>
          </div>
          <div className="headline">
            <div className="headline__title">We collect information in a few different ways:</div>
            <h2 className="subhead-list__subhead">1. When you give it to us or give us permission to obtain it</h2>
            <div className="headline__content">
              <p>When you sign up for or use Productmania, you give us certain information voluntarily. This includes your name, email address, phone number, profile photo, Pins, comments, and any other information you give us. You can also choose to share with us location data or photos. If you buy something on Productmania, we collect payment information, contact information (address and phone number) and details of what you bought. If you buy something for someone else on Productmania, we collect their delivery details and contact information.</p>
              <p>If you link your Facebook or Google account or accounts from other third party services to Productmania, we also get information from those accounts (such as your friends or contacts). The information we get from those services depends on your settings and their privacy policies, so please check what those are.</p>
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

export default ShareAppLink;