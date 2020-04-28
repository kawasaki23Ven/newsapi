import React from 'react';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import api from '../utils/api';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Search from '@material-ui/icons/Search';
import { MenuItem, FormGroup, Select, CircularProgress, Fade, Tooltip, IconButton, Button, TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Article from '../components/article';
import Pagination from '@material-ui/lab/Pagination';
import { sortOptions, languages } from '../utils/options';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SnackbarUtils from '../components/snackbar';
import styles from '../utils/styles';

const useStyles = theme => ({
    link: {
        display: 'flex',
    },
    icon: {
        width: 20,
        height: 20,
    },
    root: {
        flexGrow: 1,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
    margin: theme.spacing(1),
    marginProgress: {
        marginTop: 10,
        marginBottom: 10,
    }
});

class News extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            clearSource : false,
            source: [],
            sources: [],
            search: "",
            articles: [],
            totalResults: null,
            showProgress: true,
            showFilter: false,
            language: "",
            sortBy: ""
        };
    }

    handleChange = (event, key) => {
        let data = {};
        data[key] = key !== "source" ?  event.target.value : event.map(x => x.id);
        this.setState(data);
    };

    removeArticle = (indexArticle) => {
        this.setState({
            articles: this.state.articles.filter((item, index) => {
                return index !== indexArticle
            })
        });
        SnackbarUtils.success("Sucessfully Operation! :)");
    }

    async componentDidMount() {
        this.getHeadlines();
        this.getSources();
    }

    async getHeadlines(page) {
        try {
            this.setState({ showProgress: true });
            let data = await api.get('/top-headlines', {
                params: {
                    country: "us",
                    page
                }
            });
            this.setState({ showProgress: false, articles: data.data.articles, totalResults: data.data.totalResults });
            window.scrollTo(0, 0);
            return data.data;
        } catch (error) {
            this.setState({ showProgress: false });
        }
    }

    async handleSubmit(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        if (this.state.search) this.searchNews();
        else this.getHeadlines();
    }

    async searchNews(page) {
        try {
            this.setState({ showProgress: true });
            let data = await api.get('/everything', {
                params: {
                    page,
                    sources: this.state.source.join(","),
                    language: this.state.language,
                    sortBy: this.state.sortBy,
                    q: this.state.search,
                }
            });
            if (!data.data.articles.length) SnackbarUtils.warning("No results found! :(");
            this.setState({ showProgress: false, articles: data.data.articles, totalResults: data.data.totalResults });
            window.scrollTo(0, 0);
            return data.data;
        } catch (error) {
            this.setState({ showProgress: false });
        }
    }

    async getSources() {
        try {
            let data = await api.get('/sources', {
                params: {}
            });
            this.setState({ sources: data.data.sources });
            return data.data;
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <form onSubmit={(e) => { this.handleSubmit(e) }}>
                    <FormGroup className={classes.root}>
                        <Grid container spacing={3} direction="row" justify="flex-end">
                            <Grid item xs={10} sm={6} md={4}>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="search-input">Search</InputLabel>
                                    <Input
                                        id="search-input"
                                        value={this.state.search}
                                        onChange={(e) => this.handleChange(e, "search")}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <Search />
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <Tooltip title="Filters">
                                    <IconButton aria-label="share" onClick={() => this.setState({ showFilter: !this.state.showFilter })} >
                                        {!this.state.showFilter ? <ExpandMore /> : <ExpandLess />}
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </Grid>
                        {this.state.showFilter && <Fade in={this.state.showFilter}>
                            <div>
                                <Grid container spacing={3} className={classes.root}>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Autocomplete
                                            id="sources-select-demo"
                                            options={this.state.sources}
                                            key={this.state.clearSource}
                                            multiple
                                            fullWidth
                                            getOptionLabel={(option) => option.id}
                                            renderOption={(option) => option.name}
                                            onChange={(event, value) => this.handleChange(value, "source")} 
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Choose one or more sources"
                                                    inputProps={{
                                                        ...params.inputProps,
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <FormControl fullWidth>
                                            <InputLabel id="select-language-label">Languages</InputLabel>
                                            <Select
                                                labelId="select-language"
                                                id="select-languages"
                                                value={this.state.language}
                                                onChange={(e) => this.handleChange(e, "language")}
                                                input={<Input />}
                                            >
                                                {languages.map((option) => (
                                                    <MenuItem key={option.key} value={option.key}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <FormControl fullWidth>
                                            <InputLabel id="select-sorting-label">Sort By</InputLabel>
                                            <Select
                                                labelId="select-sorting"
                                                id="sorting"
                                                value={this.state.sortBy}
                                                onChange={(e) => this.handleChange(e, "sortBy")}
                                                input={<Input />}
                                            >
                                                {sortOptions.map((option) => (
                                                    <MenuItem key={option.key} value={option.key}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid container justify="center" alignItems="center" alignContent="center" spacing={3} className={classes.root}>
                                    <Grid item xs={12} sm={2} md={1} style={{ textAlign: "center" }}>
                                        <Button type="reset" onClick={(e) => this.setState({sortBy:[],language:"",search:"",clearSource:!this.state.clearSource})} variant="contained">CLEAR</Button>
                                    </Grid>
                                    <Grid item xs={12} sm={2} md={1} style={{ textAlign: "center" }}>
                                        <Button type="submit" variant="contained" style={{ backgroundColor: styles.backgroundColorPrimary, color: "white" }}>SEARCH</Button>
                                    </Grid>
                                </Grid>
                            </div>
                        </Fade>}
                    </FormGroup>
                </form>
                {this.state.showProgress && <Grid container justify="center"><CircularProgress size={70} className={classes.marginProgress} /></Grid>}
                <Grid container direction="row" justify="center" spacing={3}>
                    {this.state.articles.map((item, index) => {
                        return <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <Article
                                removeArticle={this.removeArticle}
                                index={index}
                                url={item.url}
                                description={item.description}
                                date={item.publishedAt}
                                image={item.urlToImage}
                                title={item.title}
                                source={item.source.name}
                                author={item.author}
                            />
                        </Grid>
                    })
                    }
                </Grid>
                {
                    this.state.totalResults && <Grid container direction="row" justify="center">
                        <Pagination count={Math.ceil(this.state.totalResults / 20)} onChange={(evt, page) => this.getHeadlines(page)} showFirstButton showLastButton />
                    </Grid>
                }
            </div>)
    }
}

News.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles, { withTheme: true })(News);
