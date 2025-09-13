// src/components/Notification.jsx
import { useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import './Notification.css';

export default function Notification({ notification, onClose }) {
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [notification, onClose]);

  if (!notification) return null;

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircle size={20} />;
      case 'error':
        return <AlertCircle size={20} />;
      case 'info':
      default:
        return <Info size={20} />;
    }
  };

  const getClassName = () => {
    return `notification notification--${notification.type}`;
  };

  return (
    <div className={getClassName()}>
      <div className="notification__icon">
        {getIcon()}
      </div>
      <div className="notification__message">
        {notification.message}
      </div>
      <button className="notification__close" onClick={onClose}>
        <X size={16} />
      </button>
    </div>
  );
}
