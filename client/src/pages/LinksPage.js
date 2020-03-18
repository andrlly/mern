import React, {useCallback, useContext, useEffect, useState} from 'react';
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {Loader} from "../components/Loader";
import {LinksList} from "../components/LinksLins";

export const LinksPage = () => {
    const [links, setLinks] = useState( null);
    const {request, loading} = useHttp();
    const {token} = useContext(AuthContext);

    const getLinks = useCallback(async () => {
        try {
            const fetched = await request(`/api/link`, 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            setLinks(fetched);
        } catch (e) {

        }
    }, [token, request]);

    useEffect(() => {
        getLinks()
    }, [getLinks]);

    if (loading) {
        return <Loader/>
    }

    return (
    <>
        {!loading && links && <LinksList links={links}/>}
    </>
    )
};
