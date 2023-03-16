import React, { useEffect, useState } from "react"
import { getProviders } from "../../managers/ProviderManager"


export const ProviderList = (props) => {
    const [ providers, setProvider ] = useState([])

    useEffect(() => {
        getProviders().then(data => setProvider(data))
    }, [])

    return (
        <article className="provider">
            <h2 className="provider__title">Provider List</h2>
            {
                providers.map(provider => {
                    return <section key={`provider--${provider.id}`} className="provider">
                        <div className="provider__name">{provider.full_name}</div>
                        <div className="provider__specialty">Specialty: {provider.specialty}</div>
                        <div className="provider__phone_number">Phone Number {provider.phone_number}</div>
                    </section>
                })
            }
        </article>
    )
}