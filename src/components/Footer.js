import React from "react"

function Footer() {
  return (
    <footer className="bg-black px-16 py-8 flex justify-between items-center text-white">
      <ul>
        <li>7400 rue Saint-André</li>
        <li>Montréal, Québec</li>
        <li>H2R 2P7</li>
      </ul>
      <div className="flex items-center gap-8 justify-center">
        <a
          href="https://www.instagram.com/courriercaverne/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            strokeWidth={1.25}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </a>
        <a
          href="https://www.facebook.com/Courrier-caverne-112116368140522/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            strokeWidth={1.25}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
          </svg>
        </a>
        <a
          href="https://goo.gl/maps/xLLDG5gpzZ5vyirs6"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            strokeWidth={1.25}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </a>
      </div>
      <a href="mailto:info@courriercaverne.ca" className="underline">
        info@courriercaverne.ca
      </a>
    </footer>
  )
}

export default Footer
