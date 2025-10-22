import React from 'react';

/**
 * ApiChip component for displaying API method badges with optional endpoint information.
 * Renders a styled chip showing the HTTP method, with support for additional endpoint text.
 *
 * @param {Object} props - Component props
 * @param {string} [props.method='GET'] - HTTP method (GET, POST, PUT, PATCH, DELETE) (optional, defaults to GET)
 * @param {string} [props.endpoint=''] - Additional endpoint text to display after the method chip (optional, defaults to empty string)
 * @param {boolean} [props.sameLine=false] - When false, adds a line break between method chip and endpoint text (optional, defaults to false)
 * @returns {JSX.Element} ApiChip component
 *
 * @example
 * // Simple GET method chip
 * <ApiChip />
 *
 * @example
 * // POST method with endpoint on new line
 * <ApiChip method="POST" endpoint="/api/users" />
 *
 * @example
 * // DELETE method with endpoint on same line
 * <ApiChip method="DELETE" endpoint="/api/users/{id}" sameLine={true} />
 */
export default function ApiChip({
  method = 'GET',
  endpoint = '',
  sameLine = false,
}) {
  const methodLower = method.toLowerCase();

  return (
    <span className={`api-method ${methodLower}`.trim()}>
      <span className="api-method-chip">{method.toUpperCase()}</span>
      {endpoint && !sameLine && <br />}
      {endpoint && sameLine && ' '}
      {endpoint && <code className="api-endpoint">{endpoint}</code>}
    </span>
  );
}
