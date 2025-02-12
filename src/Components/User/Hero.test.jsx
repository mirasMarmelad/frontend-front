import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Hero from './Hero';

// Мокаем useNavigate из react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Hero Component', () => {
  it('renders the hero section correctly', () => {
    render(
      <Router>
        <Hero />
      </Router>
    );

    expect(screen.getByText(/Откройте мир захватывающей манги!/i)).toBeInTheDocument();
    expect(screen.getByText(/Добро пожаловать в наш каталог манги,/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Перейти к каталогу/i })).toBeInTheDocument();
  });

  it('navigates to /manga on button click', () => {
    const navigate = jest.fn();
    // Передаем мок-функцию navigate в useNavigate
    require('react-router-dom').useNavigate.mockReturnValue(navigate);

    render(
      <Router>
        <Hero />
      </Router>
    );

    const button = screen.getByRole('button', { name: /Перейти к каталогу/i });
    fireEvent.click(button);

    // Проверяем, что navigate был вызван с правильным URL
    expect(navigate).toHaveBeenCalledWith('/manga');
  });
});
