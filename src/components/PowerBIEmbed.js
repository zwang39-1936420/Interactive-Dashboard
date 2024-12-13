import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import React, { useState, useEffect } from 'react';

const PowerBIDashboard = () => {
  const [accessToken, setAccessToken] = useState('');
  const [embedUrl, setEmbedUrl] = useState('');
  const [reportId, setReportId] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch('https://powerbi-dashboard-api-5acc9682ca79.herokuapp.com/get_powerbi_token');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Token response:', data);
        setAccessToken(data.access_token);
        setEmbedUrl(data.embed_url);
        setReportId(data.report_id);
      } catch (error) {
        console.error('Failed to fetch token:', error);
        setError(error.message);
      }
    };

    fetchToken();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="powerbi-container">
      {accessToken ? (
        <PowerBIEmbed
          embedConfig={{
            type: 'report',
            id: reportId,
            embedUrl: embedUrl,
            accessToken: accessToken,
            tokenType: models.TokenType.Aad,
            settings: {
              panes: {
                filters: {
                  expanded: false,
                  visible: true
                }
              },
              background: models.BackgroundType.Transparent,
              navContentPaneEnabled: false
            }
          }}
          eventHandlers={
            new Map([
              ['loaded', () => console.log('Report loaded')],
              ['rendered', () => console.log('Report rendered')],
              ['error', (event) => console.log('Error', event.detail)]
            ])
          }
          cssClassName="report-container"
        />
      ) : (
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      )}
    </div>
  );
};

export default PowerBIDashboard;