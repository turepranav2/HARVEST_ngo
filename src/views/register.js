import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

import DynamicNavbar from '../components/DynamicNavbar'
import DynamicFooter from '../components/DynamicFooter'
import { usePageContent } from '../hooks/usePageContent'
import './register.css'

const Register = () => {
  const [registerData, setRegisterData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const { getText } = usePageContent('register')

  const handleChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (registerData.password !== registerData.confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    // Here you would typically handle the registration logic
    console.log('Registration attempt:', registerData)
    alert('Registration functionality will be implemented soon!')
  }

  return (
    <div className="register-container">
      <Helmet>
        <title>{getText('seo', 'title', 'Register - HĀRVÉST')}</title>
        <meta property="og:title" content={getText('seo', 'title', 'Register - HĀRVÉST')} />
      </Helmet>
      <DynamicNavbar />
      <div className="register-split-screen">
        <div className="register-left">
          <div className="register-overlay"></div>
          <div className="register-content-left">
            <h1>{getText('hero', 'heading', 'Join Our Community')}</h1>
            <p>{getText('hero', 'subheading', 'Create an account to start making a difference today')}</p>
          </div>
        </div>
        <div className="register-right">
          <div className="register-form-container">
            <div className="register-header">
              <h2>{getText('form', 'heading', 'Create Account')}</h2>
              <p>{getText('form', 'subheading', 'Fill in your details to get started')}</p>
            </div>
            <form className="register-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="fullName">{getText('form', 'full_name_label', 'Full Name')}</label>
                <div className="input-group">
                  <i className="fas fa-user"></i>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={registerData.fullName}
                    onChange={handleChange}
                    required
                    placeholder={getText('form', 'full_name_placeholder', 'Enter your full name')}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email">{getText('form', 'email_label', 'Email')}</label>
                <div className="input-group">
                  <i className="fas fa-envelope"></i>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={registerData.email}
                    onChange={handleChange}
                    required
                    placeholder={getText('form', 'email_placeholder', 'Enter your email')}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="phone">{getText('form', 'phone_label', 'Phone Number')}</label>
                <div className="input-group">
                  <i className="fas fa-phone"></i>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={registerData.phone}
                    onChange={handleChange}
                    required
                    placeholder={getText('form', 'phone_placeholder', 'Enter your phone number')}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="password">{getText('form', 'password_label', 'Password')}</label>
                <div className="input-group">
                  <i className="fas fa-lock"></i>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={registerData.password}
                    onChange={handleChange}
                    required
                    placeholder={getText('form', 'password_placeholder', 'Create a password')}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">{getText('form', 'confirm_password_label', 'Confirm Password')}</label>
                <div className="input-group">
                  <i className="fas fa-lock"></i>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={registerData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder={getText('form', 'confirm_password_placeholder', 'Confirm your password')}
                  />
                </div>
              </div>
              <div className="form-agreement">
                <label className="checkbox-label">
                  <input type="checkbox" required />
                  <span>
                    {getText('form', 'agreement_copy', 'I agree to the')}{' '}
                    <Link to="/terms">{getText('form', 'terms_label', 'Terms of Service')}</Link>{' '}
                    {getText('form', 'and_label', 'and')}{' '}
                    <Link to="/privacy">{getText('form', 'privacy_label', 'Privacy Policy')}</Link>
                  </span>
                </label>
              </div>
              <button type="submit" className="register-button">
                {getText('form', 'submit', 'Create Account')}
              </button>
              <div className="social-register">
                <p>{getText('social', 'heading', 'Or register with')}</p>
                <div className="social-buttons">
                  <button type="button" className="social-button google">
                    <i className="fab fa-google"></i>
                  </button>
                  <button type="button" className="social-button facebook">
                    <i className="fab fa-facebook-f"></i>
                  </button>
                </div>
              </div>
            </form>
            <div className="register-footer">
              <p>
                {getText('form', 'switch_prompt', 'Already have an account?')}{' '}
                <Link to="/login">{getText('form', 'switch_cta', 'Sign In')}</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <DynamicFooter />
    </div>
  )
}

export default Register 