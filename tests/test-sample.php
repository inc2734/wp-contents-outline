<?php
/**
 * Class SampleTest
 *
 * @package inc2734/wp-basis
 */

/**
 * @todo
 */
class SampleTest extends WP_UnitTestCase {

	public function setup() {
		parent::setup();
	}

	public function tearDown() {
		parent::tearDown();
	}

	/**
	 * @test
	 */
	public function sample() {
		$bootstrap = new Inc2734\WP_Contents_Outline\Bootstrap();

		$this->assertTrue( is_a( $bootstrap, 'Inc2734\WP_Contents_Outline\Bootstrap' ) );
	}
}
