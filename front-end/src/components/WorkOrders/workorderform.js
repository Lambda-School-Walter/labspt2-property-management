import React, { Component } from 'react';
import axios from 'axios';
import Imageform from './imageform';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';


// const url = process.env.workorderURL || 'http://localhost:9000/workorders'
const url = 'https://tenantly-back.herokuapp.com/workorders';

const styles = theme => ({
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
			
	
	  },

	  innerworkorderform: {
		 

	  },
	  griditem: {
		  
	  },

	  container: {
		padding: 20,
	  },

	  typo: {
		margin: '20px',
		fontSize: '1.9rem'
	},
	
  });


class Workorderform extends Component {
	constructor(props) {
		super(props);
		this.state = {
			property: 1,
			tenant: 2,
			description: '',
			phone: '',
			unsupervisedEntry: false,
			status: 'Pending',
			url: 'none'
		};
	}

	inputhandler = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	urlUpdater = (imageurl) => {
		console.log(imageurl);
		this.setState({
			url: imageurl
		});
	};

	submithandler = (e) => {
		e.preventDefault();
  }
	render() {
		const { classes } = this.props;
		return (
			<Grid container className={classes.innerworkorderform} spacing={24}>
			<Grid item className={classes.griditem} lg={10}>
			<Card className="carditems">
			<Typography className={classes.typo} component="h2" variant="headline" gutterBottom>
          		Type Your Notes Here:
        	</Typography>
				<form className={classes.container}  onSubmit={this.submithandler}>
					<TextField
						className={classes.textField}
						onChange={this.inputhandler}
						value={this.state.description}
						name="description"
						placeholder="Description"
						className="#"
						type="text"
					/>
					<br />
					<TextField
						className={classes.textField}
						onChange={this.inputhandler}
						name="phone"
						value={this.state.phone}
						placeholder="(555)555-5555"
						className="#"
						type="text"
					/>
					<br />
					<FormControlLabel
						control={
							<Checkbox
							name="unsupervisedEntry" 
							checked={this.state.checkedB}
							onChange={this.inputhandler}
							value="checkedB"
							color="primary"
							className="#"
							type="checkbox"
							/>
						}
						label="Permission to enter?"
						/>

					<Imageform url={this.urlUpdater} />
         {/*<input name="attachimage" type='file'/> */}
					<Button variant='contained' type="submit" className="button-2">
					<SaveIcon  />
						Save
					</Button>
				</form>
				</Card>
				</Grid>
				</Grid>
		);
	}
}
<<<<<<< HEAD
<<<<<<< HEAD
export default withStyles(styles)(Workorderform);
=======
export default withStyles(styles)(Workorderform);
>>>>>>> feed1fa1e064af46ed5e0da70d74e92f986d04bb
=======

Workorderform.propTypes = {
	classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Workorderform);
>>>>>>> ee570471252027e3056b21989b5395449c21125d
