import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {Elements, StripeProvider} from 'react-stripe-elements';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import Paper from '@material-ui/core/Paper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faIdCardAlt, faEnvelope, faPhone, faMoneyBillAlt, faTools } from '@fortawesome/free-solid-svg-icons';
import "../../assets/css/general.css";
import Grid from '@material-ui/core/Grid';
const decode = require('jwt-decode');
const axios = require('axios');
const url = `https://tenantly-back.herokuapp.com/alerts`;
// const url = `http://localhost:9000/alerts`;

const styles = {
	card: {
	  minWidth: 275,
	},
	bullet: {
	  display: 'inline-block',
	  margin: '0 2px',
	  transform: 'scale(0.8)',
	},
	title: {
	  fontSize: 14,
	},
	pos: {
	  marginBottom: 12,
	},
	root: {
		width: '100%',
		maxWidth: 360,
	  },
  };

  

class tenantDashboard extends Component {
	state = {
		houseId: 1,
		residenceOwner: null,
		alerts: [],
		address: '',
		contact: '',
		maintenancePhone: '',
		charges:[]
	};

	componentDidMount() {
		// Stripe Data
		axios.get(url).then((response) => this.setState({ charges: response.data })).catch((error) => {
			console.error('Server Error', error);
		});
		const token = localStorage.getItem('jwtToken');
		const id = decode(token).userId;
		// go into users to find which residence you live at
		axios
			.get(`https://tenantly-back.herokuapp.com/users/${id}`)
			.then((user) => {
				// console.log(user);
				this.setState({ houseId: user.data.residenceId });
			})
 // go into users residence, grab some information and set it to state, grab owner of residence to supply rest of information
			.then(
				axios
					.get(`https://tenantly-back.herokuapp.com/properties/${this.state.houseId}`)
					.then((res) => {
						let property = res.data;
						this.setState({ residenceOwner: property.owner, address: property.propertyAddress });
					})
					// find the owner of logged in users residence to supply contact info for owner
					.then(
						axios.get(`https://tenantly-back.herokuapp.com/users/${this.state.residenceOwner}`).then((res) => {
							let owner = res.data;
							this.setState({ contact: owner.phone, contactEmail: owner.email });
						})
					)
			)
			.then(
				// go into alerts and grab each alerts where the houseId matches logged in users residence, set to state
				axios.get(url).then((res) => {
					let alertsObj = res.data.filter((alert) => alert.houseId === this.state.houseId);
					this.setState({ alerts: alertsObj });
				})
			);
	}
	render() {
		
		return (
			<div className="tenant-dash">
			
				<Grid item sm={12} className="tenant-button">

				<StripeProvider apiKey="pk_test_uGZWgKZiorkYlZ8MsxYEIrA2">
					<Paper elevation={1}>
						{this.state.charges.map((charge) => 

						<div>							
						<CardHeader variant='h1' title={charge.billing_details.name}/>
						<Divider/>
						<Typography variant='h4'>Date: {this.convertToTime(charge.created)}</Typography>
						<Divider/>
						<Typography>Hi</Typography>
						<Typography variant='h4' component='h2'>Amount Paid:${charge.amount}.00</Typography>
						<Divider/>					
						</div>						
						)}
					</Paper>
					</StripeProvider>

					
					<Card>
						<div className="outstanding">Outstanding Balance</div>
						<div className="outstanding">-$350.00</div>
					</Card>
					<Card>
						<Link to="/payments">
							<Button variant="extended" color="default" className="dash-button">
							<FontAwesomeIcon icon={faMoneyBillAlt} />&nbsp;&nbsp;Make a Payment
      						</Button>
						</Link>
					</Card>
					<Card>
						<Link to="/maintenance">
							<Button variant="extended" color="default" className="dash-button">
							<FontAwesomeIcon icon={faTools} />&nbsp;&nbsp;Submit a Workorder
      						</Button>
						</Link>
					</Card>
					<Card>
						<div className="outstanding">Alerts</div>
					<div>
						{this.state.alerts.map((alert) => {
							return <li key={alert.id}>{alert.alert}</li>;
						})}
					</div>
					</Card>
				</Grid>
				<Grid item sm={12}>
						<List>
							<ListItem>
								<Avatar>
									<FontAwesomeIcon icon={faMapMarkerAlt} />
								</Avatar>
								<div className="dash-info">Address: {this.state.address}</div>
							</ListItem>
					
							<ListItem>
								<Avatar>
									<FontAwesomeIcon icon={faIdCardAlt} />
								</Avatar>
								<div className="dash-info">Contact Info: {this.state.contact}</div>
							</ListItem>

							<ListItem>
								<Avatar>
									<FontAwesomeIcon icon={faEnvelope} />
								</Avatar>
								<div className="dash-info">Contact Email: {this.state.contactEmail}</div>
							</ListItem>

							<ListItem>
								<Avatar>
									<FontAwesomeIcon icon={faPhone} />
								</Avatar>
								<div className="dash-info">24/7 Phone: {this.state.maintenancePhone}</div>
							</ListItem>

					</List>
				</Grid>
			</div>
		);
	}
}

tenantDashboard.propTypes = {
	classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(tenantDashboard);
  