import React, { useState } from "react"; // JSX + local state
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedIn } from "../helpers/userAuth";              // <-- make sure this file exists
import { logoutUser } from "../State/User/UserAction";         // <-- uses LogoutUser action
import LoginModal from "../AppComponents/Auth/LoginModal";             // <-- create at this path or adjust import
import NotificationBell from "../AppComponents/Notification/NotificationComponent"
import NotificationC from "../AppComponents/Notification/NotificationConnected"
import CartIcon from "../CommonComponents/CartIcon";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((s) => s.userState?.user);
  const logged = isLoggedIn(user);
  const userName = user?.userName || "Guest";

  const [loginOpen, setLoginOpen] = useState(false);

  const navigateWithName = () => navigate("/about/5000/Robin");

  return (
    <>
      {userName === "Guest" ? (
        <h3>
          Welcome to Shopping Cart sponsored by Tech Team SIT, please click on the Login button.
        </h3>
      ) : (
        <h3>
          Welcome to Shopping Cart sponsored by Tech Team SIT, Welcome {userName}!
        </h3>
      )}

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        {/* Always visible */}
        <NavLink to="/home" className="button">Home</NavLink>
        <NavLink to="/login" className="button">User</NavLink>

        {/* Only when logged in */}
        {logged && (
          <>
            <NavLink to="/product" className="button">Product</NavLink>
            <CartIcon />
            {/* <NavLink to="/cart" className="button">Cart</NavLink> */}
            <NavLink to="/checkout" className="button">Checkout</NavLink>
            <NavLink to="/coupon" className="button">Coupon</NavLink>
            <NavLink to="/resentOrders" className="button">Orders</NavLink>
            <NavLink to="/Review" className="button">Review</NavLink>

          </>
        )}

        {/* Right side: Login/Logout */}
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
            <NotificationC />
          {logged ? (
            <>
              <span style={{ alignSelf: "center", color: "#666" }}>
                Hi, <strong>{userName}</strong>
              </span>
              <button
                className="button"
                onClick={() => dispatch(logoutUser())}
                style={{ padding: "6px 10px", borderRadius: 8 }}
              >
                Logout
              </button>
            </>
          ) : (
            <button
              className="button"
              onClick={() => setLoginOpen(true)}
              style={{ padding: "6px 10px", borderRadius: 8 }}
            >
              Login
            </button>
          )}
        </div>
      </div>

      <button onClick={navigateWithName} style={{ marginTop: 8 }}>About With Name</button>

      {/* Login modal */}
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}


// Subscriber - this component reads data from store
// Publisher - this component writes data to store
// connect() - this is a function which connects react component to redux store
// connect(mapStateToProps, mapDispatchToProps)(ComponentName)
// mapStateToProps - this is used to read the data from store and pass it as props
// mapDispatchToProps - this is used to write the data to store and pass the dispatcher functions as props