import { module, test } from 'qunit';
import { click, find, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'super-rentals/tests/helpers';

module('Acceptance | super rentals', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async function (assert) {
    await visit('/');
    assert.strictEqual(currentURL(), '/');
    assert.dom('h2').hasText('Welcome to Super Rentals!');
    assert.dom('.jumbo a.button').hasText('About Us');
    await click('.jumbo a.button');
    assert.strictEqual(currentURL(), '/about');
  });

  test('viewing the details of a rental property', async function (assert) {
    await visit('/');
    assert.dom('.rental').exists({ count: 3 });

    await click('.rental:first-of-type a');
    assert.strictEqual(currentURL(), '/rentals/grand-old-mansion');
  });

  test('visiting /rentals/grand-old-mansion', async function (assert) {
    await visit('/rentals/grand-old-mansion');

    assert.strictEqual(currentURL(), '/rentals/grand-old-mansion');
    assert.dom('nav').exists();
    assert.dom('h1').containsText('SuperRentals');
    assert.dom('h2').containsText('Grand Old Mansion');
    assert.dom('.rental.detailed').exists();
    assert.dom('.share.button').hasText('Share on Twitter');

    let button = find('.share.button');

    let tweetURL = new URL(button.href);
    assert.strictEqual(tweetURL.host, 'twitter.com');

    assert.strictEqual(
      tweetURL.searchParams.get('url'),
      `${window.location.origin}/rentals/grand-old-mansion`
    );
  });

  test('visiting /about', async function (assert) {
    await visit('/about');
    assert.strictEqual(currentURL(), '/about');
    assert.dom('h2').hasText('About Super Rentals');
    assert.dom('.jumbo a.button').hasText('Contact Us');
    await click('.jumbo a.button');
    assert.strictEqual(currentURL(), '/getting-in-touch');
  });

  test('visiting /getting-in-touch', async function (assert) {
    await visit('/getting-in-touch');
    assert.strictEqual(currentURL(), '/getting-in-touch');
    assert.dom('h2').hasText('Contact Us');
    assert.dom('.jumbo a.button').hasText('About');
    await click('.jumbo a.button');
    assert.strictEqual(currentURL(), '/about');
  });
});
