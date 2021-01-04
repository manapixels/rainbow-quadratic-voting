import React, { useEffect, useState } from "react"
import Chart from "react-apexcharts"
import { motion } from "framer-motion"
import "./Results.scss"

import dummyPoll from '../Voting/dummyPoll.json'

const Results = () => {

    const { question, results, aggregated_results } = dummyPoll || {}
    const { participants: localParticipants, choices: localChoices } = results || {}
    const { participants: globalParticipants, choices: globalChoices } = aggregated_results || {}
    const [options, setOptions] = useState({})
    const [series, setSeries] = useState([])

    useEffect(() => {
        if (localChoices && localChoices.length > 0) {

            const sortedByMostVotesFirst = localChoices.sort((a, b) => b.votes - a.votes)
            const chartCategories = sortedByMostVotesFirst.map(c => c.name)
            const chartSeriesData = sortedByMostVotesFirst.map(c => c.votes)

            //
            // Options
            //
            setOptions({
                colors: ['#e81224', '#f7630c', '#ffc83d', '#16c60c', '#0046ff', '#744da9'],
                annotations: {
                    points: [{
                        x: chartCategories[0],
                        seriesIndex: 0,
                        marker: {
                            size: 12,
                        },
                        label: {
                            borderColor: '#5318dd',
                            offsetY: 0,
                            offsetX: 8,
                            textAnchor: 'start',
                            style: {
                                color: '#fff',
                                background: '#5318dd',
                                fontSize: '1rem',
                                padding: {
                                    left: 10,
                                    right: 10,
                                    top: 10,
                                    bottom: 10
                                }
                            },
                            text: `“${chartCategories[0]}” got the most 💖`,
                        }
                    }]
                },
                chart: {
                    height: 350,
                    type: 'bar',
                    toolbar: {
                        show: false
                    }
                },
                plotOptions: {
                    bar: {
                        columnWidth: '50%',
                        distributed: true,
                        colors: {
                            backgroundBarColors: ['#ffe3e5', '#ffece0', '#fff6de', '#bce6ba', '#e3ebff', '#e5daf5']
                        },
                        // startingShape: 'rounded',
                        // endingShape: 'rounded'
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    width: 2
                },

                grid: {
                    row: {
                        colors: ['#fff']
                    },

                    padding: {
                        bottom: 30
                    },
                    borderColor: 'transparent'
                },
                xaxis: {
                    labels: {
                        rotate: -45,
                        style: {
                            fontSize: '.8rem',
                            fontWeight: 700,
                        },
                        offsetY: 5,
                    },
                    categories: chartCategories,
                    tickPlacement: 'on',
                    axisTicks: {
                        show: false
                    },
                    tooltip: {
                        enabled: false
                    }
                },
                yaxis: {
                    title: {
                        text: 'No. of Hearts 💖',
                        style: {
                            fontSize: '1rem',
                            fontWeight: 700,
                        },
                    },
                },
                legend: {
                    horizontalAlign: 'right',
                }
            })

            //
            // Series
            //
            setSeries([{
                name: 'No. of Hearts 💖',
                data: chartSeriesData
            }])
        }
    }, [localChoices])

    return (
        <div className="results">

            <div className="container">

                <div className="mt-3 mb-3">
                    <div className="no-of-participants d-inline-block">
                        {localParticipants} voters
                    </div>
                </div>

                <div className="question">{question}</div>

                <Chart
                    options={options}
                    series={series}
                    type="bar"
                    width="100%"
                    height="500px"
                />

            </div>
        </div>
    )
}

export default Results
