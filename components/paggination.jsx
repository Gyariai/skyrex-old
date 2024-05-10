import { useEffect } from 'react'

export const Paggination = ({ len, pages = 8, active, setActive }) => {
 
    useEffect(() => {
        setActive(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pages])

    const classActive = "trading-table-numbers-item active"
    const classDef = "trading-table-numbers-item"

    const length = Math.ceil(len / pages)
    return (
        <div className="trading-table-numbers">
            <div className="trading-table-numbers-arrow left-arrow" onClick={() => setActive(1)}>
                <img src="https://skyrex.io/img/table-left-arrow.svg" alt="" />
            </div>
            {
                length >= 0?
                <div className={active === 1 ? classActive : classDef} onClick={() => setActive(1)}>
                   1
                </div>
                : null
            }
            {
                length >= 2?
                <div className={active === 2 ? classActive : classDef} onClick={() => setActive(2)}>
                    2
                </div>
                : null
            }
            {
                length >= 3?
                <div className={active === 3 ? classActive : classDef} onClick={() => setActive(3)}>
                    3
                </div>
                : null
            }
            {
                length >= 4?
                <div className={active === 4 ? classActive : classDef} onClick={() => setActive(4)}>
                    4
                </div>
                : null
            }

{
                length >= 5 ?
                active <= 5 ?
                <>
                    <div className={active === 5 ? classActive : classDef} onClick={() => setActive(5)}>
                        5
                    </div>
                    {
                        length - active > 1 && length > 6 ?
                            <div className={classDef} onClick={() => setActive(active + 1)}>
                                ...
                            </div>
                        : null
                    }
                </>
                :
                <>
                    {
                        active - 4 > 1 ?
                            <div className={classDef} onClick={() => setActive(active - 1)}>
                                ...
                            </div>
                        : null
                    }
                    {
                        active !== length ?
                            <div className={classActive}>
                                {active}
                            </div>
                        : null
                    }
                    {
                        length - active > 1 ?
                            <div className={classDef} onClick={() => setActive(active + 1)}>
                                ...
                            </div>
                        : null
                    }
                </>
                : null
            }
            {
                
               
            }


            {
                length > 5 ?
                <div className={active === length ? classActive : classDef} onClick={() => setActive(length)}>
                    {length}
                </div>
                : null
            }
            
            <div className="trading-table-numbers-arrow right-arrow"  onClick={() => setActive(length)}>
                <img src="https://skyrex.io/img/table-right-arrow.svg" alt="" />
            </div>
        </div>
    )
}