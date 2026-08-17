import { useState } from 'react';
import './App.css';

// 1. All Image Imports from src/assets
import p1 from './assets/image-product-1.jpg';
import p2 from './assets/image-product-2.jpg';
import p3 from './assets/image-product-3.jpg';
import p4 from './assets/image-product-4.jpg';

import t1 from './assets/image-product-1-thumbnail.jpg';
import t2 from './assets/image-product-2-thumbnail.jpg';
import t3 from './assets/image-product-3-thumbnail.jpg';
import t4 from './assets/image-product-4-thumbnail.jpg';

import avatarImg from './assets/image-avatar.png';

function App() {
  const [activeThumb, setActiveThumb] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 2. Using imported image variables in array
  const images = [
    { main: p1, thumb: t1 },
    { main: p2, thumb: t2 },
    { main: p3, thumb: t3 },
    { main: p4, thumb: t4 },
  ];

  const handleNextImage = () => setActiveThumb((prev) => (prev + 1) % images.length);
  const handlePrevImage = () => setActiveThumb((prev) => (prev - 1 + images.length) % images.length);

  const handleNextLightbox = () => setLightboxIndex((prev) => (prev + 1) % images.length);
  const handlePrevLightbox = () => setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);

  const openLightbox = () => {
    if (window.innerWidth > 768) {
      setLightboxIndex(activeThumb);
      setIsLightboxOpen(true);
    }
  };

  const handleIncrease = () => setQuantity(prev => prev + 1);
  const handleDecrease = () => setQuantity(prev => (prev > 0 ? prev - 1 : 0));

  const handleAddToCart = () => {
    if (quantity > 0) {
      setCartCount(prevCart => prevCart + quantity);
      setQuantity(0);
    }
  };

  return (
    <div className="page-container">
      <div className="card">
        {/* Navbar */}
        <header className="navbar">
          <div className="nav-left">
            <button className="hamburger-btn" onClick={() => setIsMenuOpen(true)}>
              <svg width="16" height="15" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 12v3H0v-3h16zm0-6v3H0V6h16zm0-6v3H0V0h16z" fill="#69707D"/>
              </svg>
            </button>
            <h1 className="logo">sneakers</h1>
            <nav className={`nav-links ${isMenuOpen ? 'mobile-active' : ''}`}>
              <button className="close-menu-btn" onClick={() => setIsMenuOpen(false)}>✕</button>
              <a href="#collections" className="link">Collections</a>
              <a href="#men" className="link">Men</a>
              <a href="#women" className="link">Women</a>
              <a href="#about" className="link">About</a>
              <a href="#contact" className="link">Contact</a>
            </nav>
          </div>

          <div className="nav-right">
            <div className="cart-icon-wrapper" onClick={() => setIsCartOpen(!isCartOpen)}>
              <svg width="22" height="20" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1.134l2.58 12.899a2.687 2.687 0 0 0 2.65 2.158h10.28a2.687 2.687 0 0 0 2.65-2.158l1.35-6.75a.896.896 0 0 0-.816-.95zm-3.523 11.517H7.268a.896.896 0 0 1-.884-.719L5.038 8.083h14.596l-.884 6.356a.896.896 0 0 1-.884.719z" fill="#69707D"/>
              </svg>
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </div>

            {isCartOpen && (
              <div className="cart-dropdown">
                <div className="cart-header">Cart</div>
                <div className="cart-content">
                  {cartCount === 0 ? (
                    <p className="empty-cart-msg">Your cart is empty.</p>
                  ) : (
                    <div className="cart-items">
                      <div className="cart-item-row">
                        <img src={t1} alt="Item" className="cart-item-thumb" />
                        <div className="cart-item-details">
                          <p>Fall Limited Edition Sneakers</p>
                          <p>$125.00 x {cartCount} <span className="total-price">${125 * cartCount}.00</span></p>
                        </div>
                        <button className="delete-btn" onClick={() => setCartCount(0)}>🗑️</button>
                      </div>
                      <button className="checkout-btn">Checkout</button>
                    </div>
                  )}
                </div>
              </div>
            )}

            <img src={avatarImg} alt="Avatar" className="avatar" />
          </div>
        </header>

        {/* Product Content */}
        <main className="product-content">
          <div className="gallery">
            <div className="main-image-wrapper">
              <button className="slider-arrow prev-arrow" onClick={handlePrevImage}>❮</button>
              <img id="main-image" src={images[activeThumb].main} alt="Main Sneaker" onClick={openLightbox} />
              <button className="slider-arrow next-arrow" onClick={handleNextImage}>❯</button>
            </div>

            <div className="thumbnail-list">
              {images.map((img, index) => (
                <div 
                  key={index} 
                  className={`thumbnail-wrapper ${activeThumb === index ? 'active' : ''}`}
                  onClick={() => setActiveThumb(index)}
                >
                  <img src={img.thumb} alt={`Thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="details">
            <span className="company">SNEAKER COMPANY</span>
            <h2 className="title">Fall Limited Edition Sneakers</h2>
            <p className="description">
              These low-profile sneakers are your perfect casual companion. Featuring a durable rubber outer sole, they'll withstand everything the weather can offer.
            </p>

            <div className="price-container">
              <div className="current-price-row">
                <span className="price">$125.00</span>
                <span className="discount">50%</span>
              </div>
              <span className="old-price">$250.00</span>
            </div>

            <div className="action-container">
              <div className="quantity-control">
                <button className="qty-btn" onClick={handleDecrease}>-</button>
                <span className="qty-value">{quantity}</span>
                <button className="qty-btn" onClick={handleIncrease}>+</button>
              </div>

              <button className="add-to-cart-btn" onClick={handleAddToCart}>
                <svg width="22" height="20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1.134l2.58 12.899a2.687 2.687 0 0 0 2.65 2.158h10.28a2.687 2.687 0 0 0 2.65-2.158l1.35-6.75a.896.896 0 0 0-.816-.95z" fill="#ffffff"/>
                </svg>
                Add to cart
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="lightbox-overlay">
          <div className="lightbox-content">
            <button className="lightbox-close" onClick={() => setIsLightboxOpen(false)}>✕</button>
            <div className="lightbox-image-wrapper">
              <button className="lightbox-arrow prev" onClick={handlePrevLightbox}>❮</button>
              <img src={images[lightboxIndex].main} alt="Lightbox View" />
              <button className="lightbox-arrow next" onClick={handleNextLightbox}>❯</button>
            </div>
            <div className="thumbnail-list lightbox-thumbs">
              {images.map((img, index) => (
                <div 
                  key={index} 
                  className={`thumbnail-wrapper ${lightboxIndex === index ? 'active' : ''}`}
                  onClick={() => setLightboxIndex(index)}
                >
                  <img src={img.thumb} alt={`Thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
