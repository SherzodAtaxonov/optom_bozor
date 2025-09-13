import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin, UserPlus } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';
import './Auth.css';

export default function Register() {
  const navigate = useNavigate();
  const { actions } = useAppContext();
  const { register, addNotification } = actions;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'buyer',
    address: '',
    businessName: '', // For sellers
    businessType: '', // For sellers
    terms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Ism kiritilishi shart';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Familiya kiritilishi shart';
    }

    // Username validation
    if (!formData.username) {
      newErrors.username = 'Username kiritilishi shart';
    } else if (!/^[a-z0-9_\.]{3,30}$/i.test(formData.username)) {
      newErrors.username = 'Username noto\'g\'ri formatda (3-30 belgi, harf/son/._)';
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email manzil kiritilishi shart';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email manzil noto\'g\'ri formatda';
    }

    // Phone validation
    if (!formData.phone) {
      newErrors.phone = 'Telefon raqam kiritilishi shart';
    } else if (!/^\+998\d{9}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Telefon raqam noto\'g\'ri formatda (+998XXXXXXXXX)';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Parol kiritilishi shart';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Parol kamida 6 ta belgidan iborat bo\'lishi kerak';
    }

    // Confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Parollar mos kelmaydi';
    }

    // Seller-specific fields
    if (formData.role === 'seller') {
      if (!formData.businessName.trim()) {
        newErrors.businessName = 'Biznes nomi kiritilishi shart';
      }
      if (!formData.businessType) {
        newErrors.businessType = 'Biznes turi tanlanishi shart';
      }
    }

    // Terms agreement
    if (!formData.terms) {
      newErrors.terms = 'Foydalanish shartlarini qabul qiling';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        email: formData.email,
        phone: formData.phone.replace(/\s/g, ''),
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        role: formData.role,
        businessName: formData.role === 'seller' ? formData.businessName : undefined,
        businessType: formData.role === 'seller' ? formData.businessType : undefined,
        address: formData.address,
      };

      const newUser = await register(payload);
      addNotification('Ro\'yxatdan o\'tish muvaffaqiyatli! Tizimga kirdingiz.', 'success');

      // Redirect based on role
      switch (newUser.role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'seller':
          navigate('/seller');
          break;
        case 'buyer':
          navigate('/buyer');
          break;
        default:
          navigate('/');
      }
    } catch (error) {
      console.error('Register error:', error);
      addNotification(error.message || 'Ro\'yxatdan o\'tishda xatolik yuz berdi', 'error');
    } finally {
      setLoading(false);
    }
  };

  const formatPhoneNumber = (value) => {
    // Remove all non-digits
    const cleaned = value.replace(/\D/g, '');
    
    // Add +998 prefix if not present
    let formatted = cleaned;
    if (!cleaned.startsWith('998')) {
      formatted = '998' + cleaned;
    }
    
    // Limit to 12 digits (998 + 9 digits)
    formatted = formatted.slice(0, 12);
    
    // Format as +998 XX XXX XX XX
    if (formatted.length >= 3) {
      formatted = '+' + formatted.slice(0, 3) + ' ' + 
                 formatted.slice(3, 5) + ' ' +
                 formatted.slice(5, 8) + ' ' +
                 formatted.slice(8, 10) + ' ' +
                 formatted.slice(10, 12);
    }
    
    return formatted.trim();
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData(prev => ({ ...prev, phone: formatted }));
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card large">
          <div className="auth-header">
            <div className="auth-logo">
              <UserPlus size={40} />
            </div>
            <h1>Ro'yxatdan o'tish</h1>
            <p>Yangi hisob yaratib, savdoni boshlang</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {/* Role Selection */}
            <div className="form-group">
              <label>Kim sifatida ro'yxatdan o'tmoqchisiz?</label>
              <div className="role-selector">
                {[
                  { value: 'buyer', label: 'Haridor', icon: '🛒', desc: 'Mahsulot sotib olish uchun' },
                  { value: 'seller', label: 'Sotuvchi', icon: '🏪', desc: 'Mahsulot sotish uchun' }
                ].map((role) => (
                  <label key={role.value} className="role-option">
                    <input
                      type="radio"
                      name="role"
                      value={role.value}
                      checked={formData.role === role.value}
                      onChange={handleChange}
                    />
                    <div className="role-card">
                      <span className="role-icon">{role.icon}</span>
                      <span className="role-label">{role.label}</span>
                      <span className="role-desc">{role.desc}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Personal Info */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">Ism *</label>
                <div className="input-wrapper">
                  <User size={20} className="input-icon" />
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Ismingiz"
                    className={errors.firstName ? 'error' : ''}
                  />
                </div>
                {errors.firstName && <span className="error-message">{errors.firstName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Familiya *</label>
                <div className="input-wrapper">
                  <User size={20} className="input-icon" />
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Familiyangiz"
                    className={errors.lastName ? 'error' : ''}
                  />
                </div>
                {errors.lastName && <span className="error-message">{errors.lastName}</span>}
              </div>
            </div>

            {/* Username */}
            <div className="form-group">
              <label htmlFor="username">Username *</label>
              <div className="input-wrapper">
                <User size={20} className="input-icon" />
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="username"
                  className={errors.username ? 'error' : ''}
                />
              </div>
              {errors.username && <span className="error-message">{errors.username}</span>}
            </div>

            {/* Contact Info */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email manzil *</label>
                <div className="input-wrapper">
                  <Mail size={20} className="input-icon" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    className={errors.email ? 'error' : ''}
                  />
                </div>
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Telefon raqam *</label>
                <div className="input-wrapper">
                  <Phone size={20} className="input-icon" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    placeholder="+998 XX XXX XX XX"
                    className={errors.phone ? 'error' : ''}
                  />
                </div>
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>
            </div>

            {/* Seller fields (visible only for seller role) */}
            {formData.role === 'seller' && (
              <div key="seller-fields" className="form-row">
                <div className="form-group">
                  <label htmlFor="businessName">Biznes nomi *</label>
                  <div className="input-wrapper">
                    <User size={20} className="input-icon" />
                    <input
                      type="text"
                      id="businessName"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      placeholder="Masalan: Sherzod Meva Kompaniyasi"
                      className={errors.businessName ? 'error' : ''}
                    />
                  </div>
                  {errors.businessName && <span className="error-message">{errors.businessName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="businessType">Biznes turi *</label>
                  <div className="input-wrapper">
                    <select
                      id="businessType"
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleChange}
                      className={errors.businessType ? 'error' : ''}
                    >
                      <option value="">Tanlang</option>
                      <option value="farmer">Fermer</option>
                      <option value="wholesaler">Ulgurji sotuvchi</option>
                      <option value="retailer">Chakana sotuvchi</option>
                      <option value="processor">Qayta ishlovchi</option>
                      <option value="distributor">Distributor</option>
                      <option value="other">Boshqa</option>
                    </select>
                  </div>
                  {errors.businessType && <span className="error-message">{errors.businessType}</span>}
                </div>
              </div>
            )}

            {/* Address */}
            <div className="form-group">
              <label htmlFor="address">Manzil</label>
              <div className="input-wrapper">
                <MapPin size={20} className="input-icon" />
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Shahar, tuman, ko'cha..."
                />
              </div>
            </div>


            {/* Password */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">Parol *</label>
                <div className="input-wrapper">
                  <Lock size={20} className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Parolni kiriting"
                    className={errors.password ? 'error' : ''}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Parolni tasdiqlang *</label>
                <div className="input-wrapper">
                  <Lock size={20} className="input-icon" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Parolni qayta kiriting"
                    className={errors.confirmPassword ? 'error' : ''}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  className={errors.terms ? 'error' : ''}
                />
                <span className="checkbox-text">
                  Men <Link to="/terms" className="auth-link">foydalanish shartlari</Link> va{' '}
                  <Link to="/privacy" className="auth-link">maxfiylik siyosati</Link>ni qabul qilaman
                </span>
              </label>
              {errors.terms && <span className="error-message">{errors.terms}</span>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="auth-submit-btn"
              disabled={loading}
            >
              {loading ? (
                <div className="loading-spinner"></div>
              ) : (
                <>
                  <UserPlus size={20} />
                  Ro'yxatdan o'tish
                </>
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Allaqachon hisobingiz bormi?{' '}
              <Link to="/login" className="auth-link">
                Tizimga kiring
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
