import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { TextareaAutosize, TextField, Card, Button, Radio } from "@material-ui/core";
import { connect } from "react-redux";
import { getOneGallery } from "../../redux/actions/gallery";

const Container = styled.div`
    padding: 1rem;
    margin-top: 5rem;
`;

const StyledCard = styled(Card)`
    margin: auto;
    border: 1px solid #e8e8e8;
    max-width: 700px;
    padding: 1rem;
`;

const AddRow1 = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    & > div:first-child {
        margin-right: 0.5rem;
    }
`;

const AddRow2 = styled.div``;

const AddRow3 = styled.div`
    margin: 0.5rem 0 0rem;
    vertical-align: middle;
`;

const AddRow4 = styled.div`
    margin: 0.5rem 0 0rem;
`;

const EditGallery = ({ getOneGallery, oneGallery, match, loading }) => {
    useEffect(() => {
        getOneGallery(match.params.id);
    }, [getOneGallery, match.params.id]);

    const [formData, setFormData] = useState({
        title: "",
        text: "",
        pic_date: "",
        is_public: 0
    });

    const { title, text, pic_date, is_public } = formData;

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const onSubmit = () => {
        console.log("submit");
    };

    return (
        <Container>
            {loading && <p>Loading...</p>}
            <StyledCard>
                <AddRow1>
                    <TextField
                        autoComplete="off"
                        onChange={onChange}
                        label="Title"
                        variant="filled"
                        value={title}
                        name="title"
                        inputProps={{
                            maxLength: 42
                        }}
                        helperText={`${title.length}/${42}`}
                    />
                    <TextField
                        name="pic_date"
                        variant="filled"
                        id="pic_date"
                        label="Date"
                        type="date"
                        onChange={onChange}
                        value={pic_date}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                </AddRow1>
                <AddRow2>
                    <TextareaAutosize
                        autoComplete="off"
                        placeholder="Description"
                        name="text"
                        onChange={onChange}
                        value={text}
                        type="text"
                        rowsMin={3}
                        maxLength={500}
                    />
                </AddRow2>
                <AddRow3>
                    <Radio checked={parseInt(is_public) === 0} onChange={onChange} value={0} name="is_public" />
                    Private
                    <Radio checked={parseInt(is_public) === 1} onChange={onChange} value={1} name="is_public" />
                    Public
                </AddRow3>
                <AddRow4>
                    <Button onClick={onSubmit} variant="contained" color="primary">
                        Add
                    </Button>
                </AddRow4>
            </StyledCard>
        </Container>
    );
};

const mapStateToProps = (state) => ({
    oneGallery: state.gallery.oneGallery,
    loading: state.gallery.loading
});

const mapDispatchToProps = {
    getOneGallery
};

export default connect(mapStateToProps, mapDispatchToProps)(EditGallery);
