import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-custom-light border-custom-orange border-t-2">
      <div className="container flex items-center justify-between p-4 mx-auto sm:space-y-0 sm:flex-row ">
        <p className="flex items-center justify-between space-x-2" to="/">
          <img className="w-auto h-6 sm:h-7" src="https://groq.com/wp-content/uploads/2024/03/PBG-mark1-color.svg" alt="Logo" />
        </p>
        <p className="font-custom-footer text-sm text-custom-orange">
          a <b>Harsh Sanket</b> production —
          <a
            className="hover:text-blue-500 dark:hover:text-custom-blue"
            href="https://www.github.com/harshsanket"
          >
            @Harshsanket
          </a>
        </p>

      </div>
    </footer>
  )
}

export default Footer