import './NavBar.scss'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { AppNavBar } from 'baseui/app-nav-bar'
import logo3 from '../assets/logo3.png'
import ball from '../assets/BALL.svg'
import ChatApp from './ChatApp'
import Glossary from '../Components/Glossary'

export default function NavBar({ currentUser, photoURL, isGlossaryVisible, setIsGlossaryVisible }) {
  const navigate = useNavigate()
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  const [mainItems, setMainItems] = useState([
    { icon: null, label: 'Rosters' },
    { icon: null, label: 'Standings' },
    { icon: null, label: 'Headlines' },
    { icon: null, label: 'Glossary' },
  ])

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
      updateMainItems(window.innerWidth)
      updateUserItems(window.innerWidth)
    }

    updateMainItems(window.innerWidth)
    updateUserItems(window.innerWidth)

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [screenWidth])

  const updateMainItems = (width) => {
    const items = [
      { icon: null, label: 'Rosters' },
      { icon: null, label: 'Standings' },
      { icon: null, label: 'Headlines' },
      { icon: null, label: 'Glossary' },
    ]

    // remove search bar until functional
    /* if (width >= 1136) {
            items.unshift({ icon: null, label: "Search", id: "search" });
        } */

    setMainItems(items)
  }

  const updateUserItems = (width) => {
    if (width <= 1135) {
      const items = [
        { icon: null, label: 'Home' },
        { icon: null, label: 'User' },
        { icon: null, label: 'Rosters' },
        { icon: null, label: 'Standings' },
        { icon: null, label: 'Headlines' },
        { icon: null, label: 'Glossary' },
      ]
      setUserItems(items)
    } else {
      const items = [
        { icon: null, label: 'Home' },
        { icon: null, label: 'User' },
      ]
      setUserItems(items)
    }
  }

  const [userItems, setUserItems] = useState([
    { icon: null, label: 'Home' },
    { icon: null, label: 'User' },
    { icon: null, label: 'Rosters' },
    { icon: null, label: 'Standings' },
    { icon: null, label: 'Headlines' },
    { icon: null, label: 'Glossary' },
  ])

  function handleItemSelect(item) {
    switch (
      typeof item.label === 'string' ? item.label : item.label.props.children[1].props.children
    ) {
      case 'User':
        setIsGlossaryVisible(false)
        navigate('/loggedInPage')
        break
      case 'Home':
        setIsGlossaryVisible(false)
        navigate('/')
        break
      case 'Rosters':
        setIsGlossaryVisible(false)
        navigate('/rostersNBA')
        break
      case 'WNBA':
        setIsGlossaryVisible(false)
        navigate('/rostersWNBA')
        break
      case 'Standings':
        setIsGlossaryVisible(false)
        navigate('/teamstandings')
        break
      case 'Headlines':
        setIsGlossaryVisible(false)
        navigate('/Headlines')
        break
      case 'Glossary':
        setIsGlossaryVisible(!isGlossaryVisible)
        break
      default:
        setIsGlossaryVisible(false)
        break
    }
  }

  const handleLogoClick = () => {
    setIsGlossaryVisible(false)
    navigate('/')
  }

  const handleLogoUserClick = () => {
    setIsGlossaryVisible(false)
    navigate('/loggedInPage')
  }

  return (
    <div style={{ position: 'relative', zIndex: 10 }}>
      <AppNavBar
        title={
          <div onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
            <img src={logo3} alt="logo" height="35px" />
            Court-IQ
          </div>
        }
        mainItems={mainItems}
        userItems={userItems}
        mapItemToNode={(item) => {
          if (item.id === 'search' && screenWidth >= 1136) {
            return (
              <div className="above-chatt">
                <ChatApp />
              </div>
            )
          } else if (item.id === 'search') return ''
          return item.label
        }}
        onMainItemSelect={handleItemSelect}
        onUserItemSelect={handleItemSelect}
        overrides={{
          Root: {
            style: ({ $theme }) => ({
              // backgroundColor: "#EA6607"
            }),
          },
          MainMenuItem: {
            style: ({ $theme }) => ({
              outline: `none`,
            }),
          },
          UserMenuProfileListItem: {
            style: ({ $theme }) => ({
              marginTop:
                window.innerWidth > 1135 ? '5px' : window.innerWidth > 600 ? '78px' : '57px',
            }),
          },
        }}
        username={currentUser ? currentUser.displayName : 'User'}
        usernameSubtitle={
          <span
            to="/loggedInPage"
            onClick={handleLogoUserClick}
            style={{
              display: 'inline-block',
              backgroundColor: 'transparent',
              cursor: 'pointer',
            }}
          >
            <span
              aria-hidden="true"
              style={{
                visibility: 'hidden',
                height: 0,
              }}
            >
              Invisible Link
            </span>
          </span>
        }
        userImgUrl={!/[<>]/.test(photoURL) && currentUser ? photoURL : ball}
      />
      {isGlossaryVisible && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            zIndex: '1000',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setIsGlossaryVisible(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxHeight: screenWidth > 550 ? '89%' : '75%',
              overflowY: 'auto',
              width:
                screenWidth > 980
                  ? '55%'
                  : screenWidth > 900
                    ? '69%'
                    : screenWidth > 825
                      ? '75%'
                      : screenWidth > 800
                        ? '82%'
                        : screenWidth > 750
                          ? '84%'
                          : screenWidth > 650
                            ? '90%'
                            : screenWidth > 600
                              ? '95%'
                              : screenWidth > 550
                                ? '97%'
                                : '99%',
              backgroundColor: '#faf7f2',
              padding: '25px',
              borderRadius: '3px',
            }}
          >
            <Glossary />
          </div>
        </div>
      )}
    </div>
  )
}
