const Footer = () => {
    const currentYear = new Date().getFullYear()
  return (
    <footer className=" border-t">
        <div className="p-5 flex items-center justify-center text-center">
            {currentYear} SNEAKER. All rights reserved.
        </div>
      
    </footer>
  )
}
export default Footer
