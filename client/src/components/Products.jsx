import { LineAxisOutlined } from '@mui/icons-material';
import React, { useEffect } from 'react';
import styled from "styled-components";
import axios from "axios";
import { popularProducts } from '../data';
import Product from './Product';
import {
    useState,
} from 'react';
import { Link, Outlet } from 'react-router-dom';

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

const Products = ({ category, filters, sort }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                console.log("category get products: " + category);
                const res = await axios.get(
                    category
                        ? `http://localhost:8080/products?category=${category}`
                        : `http://localhost:8080/products`
                );
                setProducts(res.data);
            } catch (error) {

            }
        }
        getProducts();
    }, [category]);

    /* useEffect(() => {
        if (category) {
            setFilteredProducts(
                products.filter(item => Object.entries(filters).every(([key, value]) =>
                    item[key].includes(value)
                ))
            );
            <Link to={`/${category}`} />
        }
        category && setFilteredProducts(
            products.filter(item => 
                item.category === category
            )
        );
    }, [products, category, filters]); */

    /* useEffect(() => {
        setFilteredProducts(
            products.filter(item => item.category === filters)
        )
    }, [products, filters]); */

    useEffect(() => {
        category && setFilteredProducts(
            // products.filter(item => item.category === filters)
            products.filter(item => Object.entries(filters).every(([key, value]) =>
                item[key].includes(value)
            ))
            // products.filter(item => item.category === filters)
        )
        // console.log(filters);
    }, [products, category, filters]);

    useEffect(() => {
        if (sort === "newest") {
            setFilteredProducts(prev =>
                [...prev].sort((a, b) => a.createdAt - b.createdAt)
            );
        } else if (sort === "priceasc") {
            setFilteredProducts(prev =>
                [...prev].sort((a, b) => a.price - b.price)
            );
        } else if (sort === "pricedesc") {
            setFilteredProducts(prev =>
                [...prev].sort((a, b) => b.price - a.price)
            );
        }
    }, [sort]);

    return (
        <Container>
            {category ? filteredProducts.map(item => (
                <Product item={item} key={item.id} />
            )) : products.slice(0, 8).map(item => (
                <Product item={item} key={item.id} />
            ))}
            {/* {filteredProducts.map(item => (
                <Product item={item} key={item.id} />
            ))} */}
            <Outlet /> 
        </Container>
    );
};

export default Products;