import { useState, useEffect } from "react";
import './submission.css';
import '@fontsource/space-grotesk';

const LinkComp = ({ index, activeIndex, setActiveIndex }) => {
  const [url, setUrl] = useState('');
  const [isSubmitted, setSubmitted] = useState(false);
  const [favicon, setFavicon] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setActiveIndex(index);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && url) {
      let formattedUrl = formatUrl(url);
      if (isValidUrl(formattedUrl)) {
        setUrl(formattedUrl);
        setSubmitted(true);
        fetchFavicon(formattedUrl);
      } else {
        alert("Please enter a valid URL.");
      }
    }
  };

  const isValidUrl = (str) => {
    try {
      new URL(str);
      return true;
    } catch (e) {
      return false;
    }
  };

  const formatUrl = (input) => {
    let formatted = input.trim();
    if (!formatted.startsWith("http://") && !formatted.startsWith("https://")) {
      formatted = `https://${formatted}`;
    }
    return formatted;
  };

  const fetchFavicon = (siteUrl) => {
    try {
      const domain = new URL(siteUrl).hostname;
      setFavicon(`https://icons.duckduckgo.com/ip3/${domain}.ico`);
    } catch (e) {
      console.error("Favicon fetch error:", e);
    }
  };

  useEffect(() => {
    if (url && isValidUrl(url)) {
      setIsLoading(true);

      const domain = new URL(url).hostname;

      const fetchFavicon = async () => {
        try {
          const faviconUrl = `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;
          setFavicon(faviconUrl);
        } catch (error) {
          console.error("Error fetching favicon:", error);
          setFavicon(null); 
        } finally {
          setIsLoading(false);
        }
      };

      fetchFavicon();
    } else {
      setFavicon(null);
    }
  }, [url]);

  return (
    <div
      onClick={handleClick}
      className="w-16 h-16 bg-yellow-200 rounded-full flex items-center justify-center transition ease-in-out hover:bg-lime-200 relative"
    >
      {isSubmitted && url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-stone-700"
        >
          {/* Display*/}
          {favicon && !isLoading ? (
            <img
              src={favicon}
              alt="Favicon"
              className="w-10 h-10"
            />
          ) : (
            <span>ERROR</span>
          )}
        </a>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
          <path d="M281.54-298.46q-75.34 0-128.44-53.1Q100-404.65 100-479.98q0-75.33 53.1-128.44 53.1-53.12 128.44-53.12h120.77q12.75 0 21.37 8.63 8.63 8.63 8.63 21.39 0 12.75-8.63 21.37-8.62 8.61-21.37 8.61H281.49q-50.34 0-85.91 35.58Q160-530.38 160-480q0 50.38 35.58 85.96 35.57 35.58 85.91 35.58h120.82q12.75 0 21.37 8.63 8.63 8.63 8.63 21.38 0 12.76-8.63 21.37-8.62 8.62-21.37 8.62H281.54ZM360-450q-12.75 0-21.37-8.63-8.63-8.63-8.63-21.38 0-12.76 8.63-21.37Q347.25-510 360-510h240q12.75 0 21.37 8.63 8.63 8.63 8.63 21.38 0 12.76-8.63 21.37Q612.75-450 600-450H360Zm197.69 151.54q-12.75 0-21.37-8.63-8.63-8.63-8.63-21.39 0-12.75 8.63-21.37 8.62-8.61 21.37-8.61h120.82q50.34 0 85.91-35.58Q800-429.62 800-480q0-50.38-35.58-85.96-35.57-35.58-85.91-35.58H557.69q-12.75 0-21.37-8.63-8.63-8.63-8.63-21.38 0-12.76 8.63-21.37 8.62-8.62 21.37-8.62h120.77q75.34 0 128.44 53.1Q860-555.35 860-480.02q0 75.33-53.1 128.44-53.1 53.12-128.44 53.12H557.69Z"/>
        </svg>
      )}

      {activeIndex === index && !isSubmitted && (
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="URL"
          className="absolute bottom-[-45px] left-0 w-25 p-1 border border-gray-300 rounded-lg mt-10 focus:outline-none"
          autoFocus
        />
      )}
    </div>
  );
};

const MyWidget = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [rows, setRows] = useState([Date.now()]); 

  const addRow = () => {
    setRows([...rows, Date.now()]); 
  };

  const removeRow = (id) => {
    setRows(rows.filter((rowId) => rowId !== id)); 
  };

  return (
    <div className="bg-yellow-100 p-6 rounded-lg m-2 border-5 border-slate-700 widget">
      <h1 className="text-2xl text-center mb-4">Quick Links</h1>


      {rows.map((rowId, rowIndex) => (
        <div key={rowId} className="flex items-center justify-center m-5 space-x-4 relative">
          {[...Array(4)].map((_, index) => (
            <LinkComp key={`${rowId}-${index}`} index={index} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
          ))}

          {rows.length > 1 && (
            <button
              className="absolute -right-8 text-stone-700 px-2 py-1 rounded hover:bg-lime-200"
              onClick={() => removeRow(rowId)}
            >
              ✕
            </button>
          )}
        </div>
      ))}

      <div className="flex justify-center mt-4">
        <button
          className="text-stone-700 text-2xl px-4 py-2 rounded hover:bg-lime-200"
          onClick={addRow}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default MyWidget;
