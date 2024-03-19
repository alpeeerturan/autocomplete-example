import { useEffect, useRef, useState } from 'react';
import ContentLoader from "react-content-loader"

const AutocompleteLoader = () => (
    <ContentLoader
        speed={2}
        width={500}
        height={60}
        viewBox="0 0 500 60"
        backgroundColor="#f3f3f3"
        foregroundColor="#dedede"
    >
        <rect x="203" y="22" rx="0" ry="0" width="4" height="3" />
        <rect x="15" y="10" rx="0" ry="0" width="71" height="40" />
        <rect x="96" y="20" rx="0" ry="0" width="169" height="8" />
        <rect x="96" y="35" rx="0" ry="0" width="92" height="6" />
    </ContentLoader>
)

function App() {
    const [search, setSearch] = useState('')
    const [result, setResult] = useState(false)
    const [loading, setLoading] = useState(false)
    const searchRef = useRef()

    const isTyping = search.replace(/\s+/, '').length > 0;

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleClickOutside = (e) => {
        if (searchRef.current && !searchRef.current.contains(e.target)){
            setSearch('')
        }
    }

    const getResultItem = (item) => {
        window.location.href = item.url;
    }

    useEffect(() => {
        if (isTyping){
            setLoading(true)
            // 1 sn bekleme
            const timeout = setTimeout(() => {
                setResult([
                    { id: 1, title: "Örnek 1", image: "örnek", date: "2024-03-19", url: "#" },
                    { id: 2, title: "Örnek  2", image: "örnek", date: "2024-03-19", url: "#" },
                    { id: 3, title: "Örnek echo \"# autocomplete-example\" >> README.md\n" +
                            "git init\n" +
                            "git add README.md\n" +
                            "git commit -m \"first commit\"\n" +
                            "git branch -M main\n" +
                            "git remote add origin https://github.com/alpeeerturan/autocomplete-example.git\n" +
                            "git push -u origin main 3", image: "örnek", date: "2024-03-19", url: "#" }
                ]);
                setLoading(false);
            }, 1000);

            return () => clearTimeout(timeout);
        } else {
            setResult(false)
        }
    }, [search])

    return (
        <>



            <div className="search" ref={searchRef}>
                <input type="text" value={search} className={isTyping ? 'typing' : null} placeholder="Bir şeyler ara.." onChange={(e) => setSearch(e.target.value)}/>
                {isTyping && (
                    <div className="search-result">
                        {result && loading === false && result.map(item => (
                            <div onClick={() => getResultItem(item)} key={item.id} className="search-result-item">
                                <img src={item.image} alt=""/>
                                <div>
                                    <div className="title">{item.title}</div>
                                    <div className="date">{item.date}</div>
                                </div>
                            </div>
                        ))}
                        {loading && new Array(3).fill().map((_, index) => <AutocompleteLoader key={index} />)}
                        {!result && loading === false && (
                            <div className="result-not-found">
                                "{search}" ile ilgili bir şey bulamadık!
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

export default App;
