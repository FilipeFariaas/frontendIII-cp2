import styles from "./Navbar.module.css";
import {useTheme} from "../hooks/useTheme";

const Navbar = () => {
  const {theme, changeTheme} = useTheme()
  const token = localStorage.getItem('token')

  const logout = () => {
    localStorage.removeItem('token')
  }
  function handleLogout() {
    if (token) {
      localStorage.removeItem('token')
    }
  }

  return (
    <header className="sticky-top">
      <nav
        className={`navbar navbar-expand-sm navbar-${theme} bg-${theme}`}
        aria-label="Third navbar example"
      >
        <div className="container">
          <a className={`navbar-brand ${styles.navbarBrand}`} href="/home">
            DH Odonto
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsExample03"
            aria-controls="navbarsExample03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarsExample03"
          >
            <ul className="navbar-nav mb-2 mb-sm-0">
              <li className={`nav-item ${styles.navBarLink}`}>
                <a className="nav-link" href="/home">
                  Home
                </a>
              </li>
              <li className={`nav-item ${styles.navBarLink}`}>
                  {token === null ? (<a className="nav-link" href="/login" onClick={logout}>Login</a>)
                    : (<a className="nav-link" href="/login" onClick={logout}>Logout</a>)}
              </li>
              <li className={`nav-item`}>
                <button
                  className={`btn btn-${theme}`}
                  onClick={() => changeTheme(
                    localStorage.getItem('theme') === 'light' ? 'dark' : 'light'
                  )}
                >
                  {theme === 'dark' ? '🌙' : '☀'}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
