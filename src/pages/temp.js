{!this.props.match.params.postID &&
          <Row style={{ padding: '20px' }}>
            <Col>
              <Card style={{ borderRadius: '20px', backgroundColor: '#21295C' }}>
                <Card.Header style={{ color: 'white' }}>
                  <h1 style={{ textAlign: 'center' }}>Profile</h1>
                </Card.Header>
              </Card>
            </Col>
          </Row>
        }

        <Row style={{ padding: '25px' }}>
          {!this.props.match.params.postID &&
            <Col>
              <Paper elevation={24} variant="elevation" style={{ borderRadius: '10px', padding: '5px', backgroundColor: '#0E79B2' }}>
                <Card style={{ borderRadius: '10px', padding: '5px', backgroundColor: '#0E79B2' }}>
                  <Card.Header style={{ color: 'white' }}>
                    <ButtonGroup
                      aria-label="Basic example"
                      className="btn-group-toggle float-center"
                      data-toggle="buttons">
                      <Button variant="primary" onClick={() => this.setState({ tab: 1 })}><FaceIcon /></Button>
                      <Button variant="secondary" onClick={() => this.setState({ tab: 2 })}><PlaylistPlayIcon /></Button>
                      <Button variant="dark" onClick={() => this.setState({ tab: 3 })}><AlbumIcon /></Button>
                    </ButtonGroup>
                    {this.state.tab == 1 &&
                      <h4 style={{ textAlign: 'right', float: 'right' }}>top artists...</h4>
                    }
                    {this.state.tab == 2 &&
                      <h4 style={{ textAlign: 'right', float: 'right' }}>featured playlists...</h4>
                    }
                    {this.state.tab == 3 &&
                      <h4 style={{ textAlign: 'right', float: 'right' }}>top tracks...</h4>
                    }
                  </Card.Header>
                  <Card.Body style={{ height: '300px' }}>
                    <Carousel style={{ border: 'double', borderColor: 'white', width: '100%', height: '100%', backgroundColor: '#140D4F' }}>
                      {this.state.tab == 3 && UserStore.topTracks.map(item => <Carousel.Item interval={500}>


                        <Row style={{ backgroundColor: '#140D4F' }}>
                          <Col lg={5} style={{ borderRadius: '20px' }}>
                            <CardMedia
                              //onClick={() => window.open(this.state.thisTrack.link, "_blank")}
                              image={item.image}
                              //title={`${this.state.thisTrack.name} album cover`}
                              style={{ height: '100px', width: '100px', border: 'solid', borderColor: 'whitesmoke', margin: '20px' }}
                            />
                          </Col>
                          <Col lg={7} style={{ borderRadius: '20px' }}>
                            <Card style={{ margin: '5px', border: 'solid', borderColor: 'white', backgroundColor: 'whitesmoke', borderRadius: '20px' }}>
                              {/* // graphs */}
                              <Radar
                                data={chartExample1['data1']}
                                width={500}
                                height={500}
                                options={chart1_2_options}
                              />
                            </Card>
                          </Col>
                        </Row>

                        <Row style={{ backgroundColor: '#140D4F' }}>
                          <Col>
                            <Typography component="h6" variant="h6" style={{ textAlign: 'center', margin: '10px', color: 'whitesmoke' }}>
                              {item.trackName.length > 30 &&
                                `${item.trackName.substring(0, 29)}...`
                              }
                              {!(item.trackName.length > 30) &&
                                item.trackName
                              }
                            </Typography>

                            <Typography variant="subtitle1" color="textSecondary" style={{ textAlign: 'center', margin: '10px', color: 'whitesmoke' }}>
                              {item.artistName}
                            </Typography>

                          </Col>
                        </Row>
                      </Carousel.Item>)}

                      {this.state.tab == 1 && UserStore.topArtists.map(item => <Carousel.Item interval={750}>

                        <Row >
                          <Col lg={5} style={{ borderRadius: '20px' }}>
                            <CardMedia
                              onClick={() => window.open(item.link, "_blank")}
                              image={item.image}
                              //title={`${this.state.thisTrack.name} album cover`}
                              style={{ height: '100px', width: '100px', border: 'solid', borderColor: 'whitesmoke', margin: '20px' }}
                            />
                          </Col>
                          <Col lg={7} style={{ borderRadius: '20px' }}>
                            <Card style={{ margin: '5px', border: 'solid', borderColor: 'white', backgroundColor: 'whitesmoke', borderRadius: '20px', height: '150px' }}>
                              {/* // graphs */}
                              <Card.Body>
                                <Scrollbar>
                                  {this.getArtistsTopTracks(item.id).map(item => {
                                    return <h5>{item.name}</h5>
                                  })}
                                </Scrollbar>
                              </Card.Body>
                            </Card>
                          </Col>
                        </Row>

                        <Row style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }}>
                          <Typography component="h6" variant="h6" style={{ textAlign: 'center', margin: '30px', color: 'whitesmoke' }}>
                            {item.artistName}
                          </Typography>
                          {/* <Typography variant="subtitle1" color="textSecondary" style={{ textAlign: 'right', margin: '5px', color: 'whitesmoke' }}>

                          {item.artistName}

                          </Typography> */}
                        </Row>

                      </Carousel.Item>)}

                      {this.state.tab == 2 && UserStore.playlist.map(item => <Carousel.Item interval={500}>

                        <Row >
                          <Col style={{ borderRadius: '20px' }}>
                            <CardMedia
                              onClick={() => window.open(item.link, "_blank")}
                              image={item.images}
                              //title={`${this.state.thisTrack.name} album cover`}
                              style={{ height: '100px', width: '100px', border: 'solid', borderColor: 'whitesmoke', margin: '20px' }}
                            />
                          </Col>
                        </Row>

                        <Row style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }}>
                          <Typography component="h6" variant="h6" style={{ textAlign: 'center', margin: '30px', color: 'whitesmoke' }}>
                            {item.title}
                          </Typography>
                          {/* <Typography variant="subtitle1" color="textSecondary" style={{ textAlign: 'right', margin: '5px', color: 'whitesmoke' }}>

                          {item.artistName}

                          </Typography> */}
                        </Row>

                      </Carousel.Item>)}

                    </Carousel>
                  </Card.Body>
                </Card>
              </Paper>
            </Col>
          }

          {!this.props.match.params.postID &&
            <Col>
              <Paper elevation={24} variant="elevation" style={{ borderRadius: '10px', padding: '5px', backgroundColor: '#0E79B2' }}>
                {!this.props.match.params.meloID &&
                  <h1 style={{ color: '#21295C', textAlign: 'center' }}>{UserStore.thisUserProfile.credentials.meloID}</h1>
                }
                {!this.props.match.params.meloID &&
                  <Image src={UserStore.thisSpotifyProfile.image} roundedCircle style={{ height: '150px', margin: '10px', width: '150px', border: 'outset', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
                }
                {this.props.match.params.meloID &&
                  <h1 style={{ color: '#21295C', textAlign: 'center' }}>{this.props.match.params.meloID}</h1>
                }
                {this.props.match.params.meloID &&
                  <Image src={UserStore.thisSpotifyProfile.image} roundedCircle style={{ height: '150px', margin: '10px', width: '150px', border: 'outset', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
                }

                <Button onClick={this.toggleEdit} style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}><SettingsIcon /></Button>
                {/**add Col and style for extra credentials */}
                <Col style={{ padding: '15px' }}>
                  <Row style={{ margin: '5px', borderRadius: '15px', borderRadius: '20px' }}>
                    <Col lg={4}>
                      <h4 style={{ textAlign: 'right', color: '#151E3F' }}><SubjectIcon />  </h4>
                    </Col>
                    {!this.state.edit &&
                      <Col>
                        <h4 style={{ textAlign: 'left', color: '#151E3F' }}>{UserStore.thisUserProfile.credentials.bio}</h4>
                      </Col>
                    }
                    {this.state.edit &&
                      <Col>
                        <input type="text" name="bio" placeholder="bio" value={this.state.bio} onChange={this.handleChange} />
                      </Col>
                    }
                  </Row>

                  <Row style={{ margin: '5px', borderRadius: '15px', borderRadius: '20px' }}>
                    <Col lg={4}>
                      <h4 style={{ textAlign: 'right', color: '#151E3F' }}><LanguageIcon />  </h4>
                    </Col>
                    {!this.state.edit &&
                      <Col>
                        <h4 style={{ textAlign: 'left', color: '#151E3F' }}>{UserStore.thisUserProfile.credentials.website}</h4>
                      </Col>
                    }
                    {this.state.edit &&
                      <Col>
                        <input type="text" name="website" placeholder="website" value={this.state.website} onChange={this.handleChange} />
                      </Col>
                    }
                  </Row>

                  <Row style={{ margin: '5px', borderRadius: '15px', borderRadius: '20px' }}>
                    <Col lg={4}>
                      <h4 style={{ textAlign: 'right', color: '#151E3F' }}><LocationOnIcon />  </h4>
                    </Col>
                    {!this.state.edit &&
                      <Col>
                        <h4 style={{ textAlign: 'left', color: '#151E3F' }}>{UserStore.thisUserProfile.credentials.location}</h4>
                      </Col>
                    }
                    {this.state.edit &&
                      <Col>
                        <input type="text" name="location" placeholder="location" value={this.state.location} onChange={this.handleChange} />
                      </Col>
                    }
                  </Row>
                </Col>


              </Paper>


            </Col>
          }

          {!this.props.match.params.postID &&
            <Col>
              <Paper elevation={24} variant="elevation" style={{ borderRadius: '10px', padding: '5px', backgroundColor: '#0E79B2' }}>
                <Card style={{ borderRadius: '10px', padding: '5px', backgroundColor: '#0E79B2' }}>
                  <Card.Header style={{ color: 'white' }}>
                    <ButtonGroup
                      aria-label="Basic example"
                      className="btn-group-toggle float-left"
                      data-toggle="buttons">
                      <Button variant="primary" onClick={() => this.setState({ tab2: 1 })}><BookmarksIcon /></Button>
                      <Button variant="dark" onClick={() => this.setState({ tab2: 2 })}><FeaturedPlayListIcon /></Button>
                      <Button variant="secondary" onClick={() => this.setState({ tab2: 3 })}><FavoriteIcon /></Button>
                      {/* <Button variant="secondary">Recommend</Button> */}
                    </ButtonGroup>
                    {this.state.tab2 == 1 &&
                      <h4 style={{ textAlign: 'right', float: 'right' }}>bookmarked posts...</h4>
                    }
                    {this.state.tab2 == 2 &&
                      <h4 style={{ textAlign: 'right', float: 'right' }}>you might like...</h4>
                    }
                    {this.state.tab2 == 3 &&
                      <h4 style={{ textAlign: 'right', float: 'right' }}>liked posts...</h4>
                    }
                  </Card.Header>
                  <Card.Body style={{ height: '300px' }}>
                    <Carousel style={{ border: 'double', borderColor: 'white', width: '100%', height: '100%', backgroundColor: '#140D4F' }}>

                      {this.state.tab2 == 2 &&
                        UserStore.recommend.map(item => <Carousel.Item interval={500}>

                          <Row style={{ backgroundColor: '#140D4F' }}>
                            <Col lg={5} style={{ borderRadius: '20px' }}>
                              <CardMedia
                                //onClick={() => window.open(this.state.thisTrack.link, "_blank")}
                                image={item.image}
                                //title={`${this.state.thisTrack.name} album cover`}
                                style={{ height: '100px', width: '100px', border: 'solid', borderColor: 'whitesmoke', margin: '20px' }}
                              />
                            </Col>
                            <Col lg={7} style={{ borderRadius: '20px' }}>
                              <Card style={{ margin: '5px', border: 'solid', borderColor: 'white', backgroundColor: 'whitesmoke', borderRadius: '20px' }}>
                                {/* // graphs */}
                                <Radar
                                  data={chartExample1['data1']}
                                  width={500}
                                  height={500}
                                  options={chart1_2_options}
                                />
                              </Card>
                            </Col>
                          </Row>

                          <Row style={{ backgroundColor: '#140D4F' }}>
                            <Col>
                              <Typography component="h6" variant="h6" style={{ textAlign: 'center', margin: '10px', color: 'whitesmoke' }}>
                                {item.name.length > 30 &&
                                  `${item.name.substring(0, 29)}...`
                                }
                                {!(item.name.length > 30) &&
                                  item.name
                                }
                              </Typography>

                              <Typography variant="subtitle1" color="textSecondary" style={{ textAlign: 'center', margin: '10px', color: 'whitesmoke' }}>
                                {item.artistName}
                              </Typography>

                            </Col>
                          </Row>
                        </Carousel.Item>)}

                    </Carousel>
                  </Card.Body>
                </Card>
              </Paper>
            </Col>
          }
        </Row>

        {!this.props.match.params.postID &&
          <Row style={{ padding: '10px' }}>
            <Col>
              <Card style={{ borderRadius: '20px', backgroundColor: '#21295C' }}>
                {!this.props.match.params.meloID &&
                  <Card.Header style={{ color: 'white' }}>
                    <h1 style={{ textAlign: 'center' }}>{`${UserStore.thisUserProfile.credentials.meloID}'s Playlists`}</h1>
                  </Card.Header>
                }
                {this.props.match.params.meloID &&
                  <Card.Header style={{ color: 'white' }}>
                    <h1 style={{ textAlign: 'center' }}>{`${this.props.match.params.meloID}'s Playlists`}</h1>
                  </Card.Header>
                }
              </Card>
            </Col>
          </Row>
        }

        {!this.props.match.params.postID &&
          <Row>
            <Col>
              <Card style={{ backgroundColor: '#0E79B2' }}>
                <Coverflow
                  width={250}
                  height={250}
                  displayQuantityOfSide={2.5}
                  navigation={true}
                  enableHeading={true}
                  enableScroll={false}
                  active={this.state.active}
                >

                  {UserStore.playlist.map(item => <img src={item.images} alt={item.title} data-action={item.link} style={{ borderRadius: '20px', width: '175px', height: '175px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />)}

                </Coverflow>
              </Card>

            </Col>
          </Row>
        }

        <Row style={{ padding: '10px', margin: '10px' }}>
          <Col>
            <Card style={{ borderRadius: '20px', backgroundColor: '#21295C' }}>
              {!this.props.match.params.meloID &&
                <Card.Header style={{ color: 'white' }}>
                  <h1 style={{ textAlign: 'center' }}>{`${UserStore.thisUserProfile.credentials.meloID}'s Zone`}</h1>
                </Card.Header>
              }
              {this.props.match.params.meloID &&
                <Card.Header style={{ color: 'white' }}>
                  <h1 style={{ textAlign: 'center' }}>{`${this.props.match.params.meloID}'s Zone`}</h1>
                </Card.Header>
              }
            </Card>
          </Col>
        </Row>

        <Row style={{ margin: '10px' }}>
          <Paper elevation={24} variant="elevation" style={{ borderRadius: '10px', padding: '5px', backgroundColor: '#0E79B2', marginLeft: 'auto', marginRight: 'auto', display: 'block', width: '70%' }}>
            <Card style={{ padding: '10px', borderRadius: '20px', backgroundColor: '#0E79B2', marginLeft: 'auto', marginRight: 'auto', display: 'block' }}>
              <Card.Header style={{ backgroundColor: '#151E3F', borderRadius: '15px' }}>
                <h3 style={{ color: 'white' }}>what's happening...</h3>
              </Card.Header>
              <Card.Body>
                <p>{recentPostsMarkup}</p>
              </Card.Body>
            </Card>
          </Paper>
        </Row>

        { this.props.match.params.meloID &&
          <Row style={{ margin: '10px' }}>
          <Card style={{ padding: '10px', borderRadius: '20px', backgroundColor: '#A3B0E0', marginLeft: 'auto', marginRight: 'auto', display: 'block' }}>
            <Card.Header style={{ backgroundColor: '#151E3F', borderRadius: '15px' }}>
              <h3 style={{ color: 'white' }}>comments...</h3>
            </Card.Header>
            <Card.Body>
              <p>{comments}</p>
            </Card.Body>
          </Card>
        </Row>
        }