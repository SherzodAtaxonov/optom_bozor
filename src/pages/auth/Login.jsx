import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, LogIn, User } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';
import './Auth.css';

export default function Login() {
  const navigate = useNavigate();
  const { actions } = useAppContext();
  const { login, addNotification } = actions;

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'buyer' // Default role
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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

    if (!formData.username) {
      newErrors.username = 'Username kiritilishi shart';
    }

    if (!formData.password) {
      newErrors.password = 'Parol kiritilishi shart';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Parol kamida 6 ta belgidan iborat bo\'lishi kerak';
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
      // Real login via API
      const user = await login(formData.username, formData.password);

      addNotification('Muvaffaqiyatli tizimga kirdingiz!', 'success');

      // Redirect based on actual user role from backend
      switch (user.role) {
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
      console.error('Login error:', error);
      addNotification(error.message || 'Tizimga kirishda xatolik yuz berdi', 'error');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo">
              <User size={40} />
            </div>
            <h1>Tizimga kirish</h1>
            <p>Hisobingizga kiring va savdoni boshlang</p>
          </div>

          

          <form onSubmit={handleSubmit} className="auth-form">
            {/* Role Selection */}
            <div className="form-group">
              <label>Rol tanlang</label>
              <div className="role-selector">
                {[
                  { value: 'buyer', label: 'Haridor', icon: '🛒' },
                  { value: 'seller', label: 'Sotuvchi', icon: '🏪' },
                  { value: 'admin', label: 'Admin', icon: '👨‍💼' }
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
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Username */}
            <div className="form-group">
              <label htmlFor="username">Username</label>
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

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Parol</label>
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
                  <LogIn size={20} />
                  Kirish
                </>
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Hisobingiz yo'qmi?{' '}
              <Link to="/register" className="auth-link">
                Ro'yxatdan o'ting
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
