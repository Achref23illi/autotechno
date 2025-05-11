'use client';

import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

// Types for settings
interface GeneralSettings {
  siteName: string;
  companyName: string;
  supportEmail: string;
  phoneNumber: string;
  address: string;
  vatNumber: string;
  currency: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  orderConfirmations: boolean;
  marketingEmails: boolean;
  newCustomerAlerts: boolean;
  lowStockAlerts: boolean;
}

interface SecuritySettings {
  twoFactorAuth: boolean;
  requireStrongPasswords: boolean;
  sessionTimeout: number;
  ipRestriction: boolean;
  allowedIPs: string;
}

interface IntegrationSettings {
  googleAnalytics: boolean;
  googleAnalyticsId: string;
  facebookPixel: boolean;
  facebookPixelId: string;
  paypalIntegration: boolean;
  paypalEmail: string;
  stripeIntegration: boolean;
  stripeApiKey: string;
}

export default function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  
  // Sample initial settings
  const [generalSettings, setGeneralSettings] = useState<GeneralSettings>({
    siteName: 'AutoTechno',
    companyName: 'AutoTechno Solutions Ltd',
    supportEmail: 'support@autotechno.com',
    phoneNumber: '+1-555-123-4567',
    address: '123 Main Street, Anytown, AT 12345',
    vatNumber: 'ATN12345678',
    currency: 'EUR',
  });
  
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    orderConfirmations: true,
    marketingEmails: false,
    newCustomerAlerts: true,
    lowStockAlerts: true,
  });
  
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactorAuth: false,
    requireStrongPasswords: true,
    sessionTimeout: 60,
    ipRestriction: false,
    allowedIPs: '',
  });
  
  const [integrationSettings, setIntegrationSettings] = useState<IntegrationSettings>({
    googleAnalytics: true,
    googleAnalyticsId: 'UA-123456789-1',
    facebookPixel: false,
    facebookPixelId: '',
    paypalIntegration: true,
    paypalEmail: 'payments@autotechno.com',
    stripeIntegration: false,
    stripeApiKey: '',
  });
  
  // Currencies for dropdown
  const currencies = [
    { code: 'EUR', name: 'Euro (€)' },
    { code: 'USD', name: 'US Dollar ($)' },
    { code: 'GBP', name: 'British Pound (£)' },
  ];
  
  // Session timeout options
  const timeoutOptions = [
    { value: 15, label: '15 minutes' },
    { value: 30, label: '30 minutes' },
    { value: 60, label: '1 hour' },
    { value: 120, label: '2 hours' },
    { value: 240, label: '4 hours' },
    { value: 480, label: '8 hours' },
  ];
  
  const handleSaveSettings = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setSaveMessage('Settings saved successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSaveMessage(null), 3000);
    }, 1000);
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="pb-5 border-b border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage your system preferences and configurations.
          </p>
        </div>
        
        {/* Tabs Navigation */}
        <div className="mt-6">
          <div className="sm:hidden">
            <select
              id="tabs"
              name="tabs"
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm rounded-md"
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
            >
              <option value="general">General</option>
              <option value="notifications">Notifications</option>
              <option value="security">Security</option>
              <option value="integrations">Integrations</option>
            </select>
          </div>
          <div className="hidden sm:block">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab('general')}
                  className={`${
                    activeTab === 'general'
                      ? 'border-yellow-500 text-yellow-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  General
                </button>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`${
                    activeTab === 'notifications'
                      ? 'border-yellow-500 text-yellow-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Notifications
                </button>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`${
                    activeTab === 'security'
                      ? 'border-yellow-500 text-yellow-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Security
                </button>
                <button
                  onClick={() => setActiveTab('integrations')}
                  className={`${
                    activeTab === 'integrations'
                      ? 'border-yellow-500 text-yellow-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Integrations
                </button>
              </nav>
            </div>
          </div>
        </div>
        
        {/* Settings Forms */}
        <div className="mt-6 bg-white shadow rounded-lg">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">General Settings</h3>
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="site-name" className="block text-sm font-medium text-gray-700">
                    Site Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="site-name"
                      id="site-name"
                      className="shadow-sm focus:ring-yellow-500 focus:border-yellow-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      value={generalSettings.siteName}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, siteName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="company-name" className="block text-sm font-medium text-gray-700">
                    Company Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="company-name"
                      id="company-name"
                      className="shadow-sm focus:ring-yellow-500 focus:border-yellow-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      value={generalSettings.companyName}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, companyName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="support-email" className="block text-sm font-medium text-gray-700">
                    Support Email
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      name="support-email"
                      id="support-email"
                      autoComplete="email"
                      className="shadow-sm focus:ring-yellow-500 focus:border-yellow-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      value={generalSettings.supportEmail}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, supportEmail: e.target.value })}
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="phone-number"
                      id="phone-number"
                      autoComplete="tel"
                      className="shadow-sm focus:ring-yellow-500 focus:border-yellow-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      value={generalSettings.phoneNumber}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, phoneNumber: e.target.value })}
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Business Address
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="address"
                      name="address"
                      rows={3}
                      className="shadow-sm focus:ring-yellow-500 focus:border-yellow-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                      value={generalSettings.address}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, address: e.target.value })}
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="vat-number" className="block text-sm font-medium text-gray-700">
                    VAT/Tax Number
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="vat-number"
                      id="vat-number"
                      className="shadow-sm focus:ring-yellow-500 focus:border-yellow-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      value={generalSettings.vatNumber}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, vatNumber: e.target.value })}
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
                    Default Currency
                  </label>
                  <div className="mt-1">
                    <select
                      id="currency"
                      name="currency"
                      className="shadow-sm focus:ring-yellow-500 focus:border-yellow-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      value={generalSettings.currency}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, currency: e.target.value })}
                    >
                      {currencies.map((currency) => (
                        <option key={currency.code} value={currency.code}>
                          {currency.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Notification Settings</h3>
              <div className="mt-6 space-y-6">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="email-notifications"
                      name="email-notifications"
                      type="checkbox"
                      className="focus:ring-yellow-500 h-4 w-4 text-yellow-600 border-gray-300 rounded"
                      checked={notificationSettings.emailNotifications}
                      onChange={(e) => setNotificationSettings({ ...notificationSettings, emailNotifications: e.target.checked })}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="email-notifications" className="font-medium text-gray-700">
                      Email Notifications
                    </label>
                    <p className="text-gray-500">Receive system notifications via email.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="order-confirmations"
                      name="order-confirmations"
                      type="checkbox"
                      className="focus:ring-yellow-500 h-4 w-4 text-yellow-600 border-gray-300 rounded"
                      checked={notificationSettings.orderConfirmations}
                      onChange={(e) => setNotificationSettings({ ...notificationSettings, orderConfirmations: e.target.checked })}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="order-confirmations" className="font-medium text-gray-700">
                      Order Confirmations
                    </label>
                    <p className="text-gray-500">Receive email notifications for new orders.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="marketing-emails"
                      name="marketing-emails"
                      type="checkbox"
                      className="focus:ring-yellow-500 h-4 w-4 text-yellow-600 border-gray-300 rounded"
                      checked={notificationSettings.marketingEmails}
                      onChange={(e) => setNotificationSettings({ ...notificationSettings, marketingEmails: e.target.checked })}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="marketing-emails" className="font-medium text-gray-700">
                      Marketing Emails
                    </label>
                    <p className="text-gray-500">Receive promotional emails and updates.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="new-customer-alerts"
                      name="new-customer-alerts"
                      type="checkbox"
                      className="focus:ring-yellow-500 h-4 w-4 text-yellow-600 border-gray-300 rounded"
                      checked={notificationSettings.newCustomerAlerts}
                      onChange={(e) => setNotificationSettings({ ...notificationSettings, newCustomerAlerts: e.target.checked })}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="new-customer-alerts" className="font-medium text-gray-700">
                      New Customer Alerts
                    </label>
                    <p className="text-gray-500">Receive alerts when new customers register.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="low-stock-alerts"
                      name="low-stock-alerts"
                      type="checkbox"
                      className="focus:ring-yellow-500 h-4 w-4 text-yellow-600 border-gray-300 rounded"
                      checked={notificationSettings.lowStockAlerts}
                      onChange={(e) => setNotificationSettings({ ...notificationSettings, lowStockAlerts: e.target.checked })}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="low-stock-alerts" className="font-medium text-gray-700">
                      Low Stock Alerts
                    </label>
                    <p className="text-gray-500">Receive alerts when token packages are running low.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Security Settings</h3>
              <div className="mt-6 space-y-6">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="two-factor-auth"
                      name="two-factor-auth"
                      type="checkbox"
                      className="focus:ring-yellow-500 h-4 w-4 text-yellow-600 border-gray-300 rounded"
                      checked={securitySettings.twoFactorAuth}
                      onChange={(e) => setSecuritySettings({ ...securitySettings, twoFactorAuth: e.target.checked })}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="two-factor-auth" className="font-medium text-gray-700">
                      Two-Factor Authentication
                    </label>
                    <p className="text-gray-500">Require two-factor authentication for all admin accounts.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="strong-passwords"
                      name="strong-passwords"
                      type="checkbox"
                      className="focus:ring-yellow-500 h-4 w-4 text-yellow-600 border-gray-300 rounded"
                      checked={securitySettings.requireStrongPasswords}
                      onChange={(e) => setSecuritySettings({ ...securitySettings, requireStrongPasswords: e.target.checked })}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="strong-passwords" className="font-medium text-gray-700">
                      Require Strong Passwords
                    </label>
                    <p className="text-gray-500">Enforce strong password rules for all user accounts.</p>
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
                  <label htmlFor="session-timeout" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Session Timeout
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <select
                      id="session-timeout"
                      name="session-timeout"
                      className="max-w-lg block focus:ring-yellow-500 focus:border-yellow-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeout: parseInt(e.target.value) })}
                    >
                      {timeoutOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <p className="mt-2 text-sm text-gray-500">
                      Automatically log out users after the specified period of inactivity.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="ip-restriction"
                      name="ip-restriction"
                      type="checkbox"
                      className="focus:ring-yellow-500 h-4 w-4 text-yellow-600 border-gray-300 rounded"
                      checked={securitySettings.ipRestriction}
                      onChange={(e) => setSecuritySettings({ ...securitySettings, ipRestriction: e.target.checked })}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="ip-restriction" className="font-medium text-gray-700">
                      IP Address Restriction
                    </label>
                    <p className="text-gray-500">Limit admin access to specific IP addresses.</p>
                  </div>
                </div>

                {securitySettings.ipRestriction && (
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                    <label htmlFor="allowed-ips" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                      Allowed IP Addresses
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input
                        type="text"
                        name="allowed-ips"
                        id="allowed-ips"
                        className="max-w-lg block w-full shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                        placeholder="192.168.1.1, 10.0.0.1"
                        value={securitySettings.allowedIPs}
                        onChange={(e) => setSecuritySettings({ ...securitySettings, allowedIPs: e.target.value })}
                      />
                      <p className="mt-2 text-sm text-gray-500">
                        Enter comma-separated IP addresses or CIDR notation.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Integration Settings */}
          {activeTab === 'integrations' && (
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Integration Settings</h3>
              <div className="mt-6 space-y-6">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="google-analytics"
                      name="google-analytics"
                      type="checkbox"
                      className="focus:ring-yellow-500 h-4 w-4 text-yellow-600 border-gray-300 rounded"
                      checked={integrationSettings.googleAnalytics}
                      onChange={(e) => setIntegrationSettings({ ...integrationSettings, googleAnalytics: e.target.checked })}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="google-analytics" className="font-medium text-gray-700">
                      Google Analytics
                    </label>
                    <p className="text-gray-500">Enable Google Analytics tracking.</p>
                  </div>
                </div>

                {integrationSettings.googleAnalytics && (
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                    <label htmlFor="ga-id" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                      Google Analytics ID
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input
                        type="text"
                        name="ga-id"
                        id="ga-id"
                        className="max-w-lg block w-full shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                        placeholder="UA-XXXXXXXXX-X"
                        value={integrationSettings.googleAnalyticsId}
                        onChange={(e) => setIntegrationSettings({ ...integrationSettings, googleAnalyticsId: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="facebook-pixel"
                      name="facebook-pixel"
                      type="checkbox"
                      className="focus:ring-yellow-500 h-4 w-4 text-yellow-600 border-gray-300 rounded"
                      checked={integrationSettings.facebookPixel}
                      onChange={(e) => setIntegrationSettings({ ...integrationSettings, facebookPixel: e.target.checked })}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="facebook-pixel" className="font-medium text-gray-700">
                      Facebook Pixel
                    </label>
                    <p className="text-gray-500">Enable Facebook Pixel tracking.</p>
                  </div>
                </div>

                {integrationSettings.facebookPixel && (
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                    <label htmlFor="fb-pixel-id" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                      Facebook Pixel ID
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input
                        type="text"
                        name="fb-pixel-id"
                        id="fb-pixel-id"
                        className="max-w-lg block w-full shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                        placeholder="XXXXXXXXXXXXXXXXXX"
                        value={integrationSettings.facebookPixelId}
                        onChange={(e) => setIntegrationSettings({ ...integrationSettings, facebookPixelId: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="paypal-integration"
                      name="paypal-integration"
                      type="checkbox"
                      className="focus:ring-yellow-500 h-4 w-4 text-yellow-600 border-gray-300 rounded"
                      checked={integrationSettings.paypalIntegration}
                      onChange={(e) => setIntegrationSettings({ ...integrationSettings, paypalIntegration: e.target.checked })}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="paypal-integration" className="font-medium text-gray-700">
                      PayPal Integration
                    </label>
                    <p className="text-gray-500">Enable PayPal payment gateway.</p>
                  </div>
                </div>

                {integrationSettings.paypalIntegration && (
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                    <label htmlFor="paypal-email" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                      PayPal Email
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input
                        type="email"
                        name="paypal-email"
                        id="paypal-email"
                        className="max-w-lg block w-full shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                        placeholder="payments@yourbusiness.com"
                        value={integrationSettings.paypalEmail}
                        onChange={(e) => setIntegrationSettings({ ...integrationSettings, paypalEmail: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="stripe-integration"
                      name="stripe-integration"
                      type="checkbox"
                      className="focus:ring-yellow-500 h-4 w-4 text-yellow-600 border-gray-300 rounded"
                      checked={integrationSettings.stripeIntegration}
                      onChange={(e) => setIntegrationSettings({ ...integrationSettings, stripeIntegration: e.target.checked })}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="stripe-integration" className="font-medium text-gray-700">
                      Stripe Integration
                    </label>
                    <p className="text-gray-500">Enable Stripe payment gateway.</p>
                  </div>
                </div>

                {integrationSettings.stripeIntegration && (
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                    <label htmlFor="stripe-api-key" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                      Stripe API Key
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input
                        type="text"
                        name="stripe-api-key"
                        id="stripe-api-key"
                        className="max-w-lg block w-full shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                        placeholder="sk_test_xxxxxxxxxxxxxxxxxxxx"
                        value={integrationSettings.stripeApiKey}
                        onChange={(e) => setIntegrationSettings({ ...integrationSettings, stripeApiKey: e.target.value })}
                      />
                      <p className="mt-2 text-sm text-gray-500">
                        Never share your Stripe secret key. Only enter your publishable key here.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Save Button and Status */}
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 flex items-center justify-end">
            {saveMessage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mr-4 text-sm text-green-600"
              >
                {saveMessage}
              </motion.div>
            )}
            <button
              type="button"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              onClick={handleSaveSettings}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                'Save Settings'
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}