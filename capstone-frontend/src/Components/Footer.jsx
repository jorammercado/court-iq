import { Block } from 'baseui/block'

const Footer = () => {
  return (
    <div
      style={{
        width: '100%',
        padding: '20px 0',
        textAlign: 'center',
        backgroundColor: '#333',
        color: '#fff',
        borderTop: '1px solid #444',
        marginTop: 'auto',
      }}
    >
      © {new Date().getFullYear()} My Company
    </div>
  )
}

export default Footer
