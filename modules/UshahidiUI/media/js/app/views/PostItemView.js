/**
 * Post Item
 *
 * @module     PostItemView
 * @author     Ushahidi Team <team@ushahidi.com>
 * @copyright  2013 Ushahidi
 * @license    https://www.gnu.org/licenses/agpl-3.0.html GNU Affero General Public License Version 3 (AGPL3)
 */

define(['App', 'marionette', 'underscore', 'handlebars', 'alertify', 'text!templates/PostListItem.html'],
	function(App, Marionette, _, Handlebars, alertify, template)
	{
		//ItemView provides some default rendering logic
		return Marionette.ItemView.extend(
		{
			//Template HTML string
			template: Handlebars.compile(template),
			tagName: 'li',
			className: 'list-view-post',

			events: {
				'click .post-delete': 'deletepost',
				'click .js-post-edit' : 'showEditPost',
				'click .js-post-set' : 'showAddToSet'
			},

			deletepost: function(e)
			{
				var that = this;
				e.preventDefault();
				alertify.confirm('Are you sure you want to delete?', function(e)
				{
					if (e)
					{
						that.model.destroy({
							// Wait till server responds before destroying model
							wait: true
						}).done(function()
						{
							alertify.success('Post has been deleted');
						}).fail(function ()
						{
							alertify.error('Unable to delete post, please try again');
						});
					}
					else
					{
						alertify.log('Delete cancelled');
					}
				});
			},

			serializeData: function()
			{
				var data = _.extend(this.model.toJSON(), {
					isPublished : this.model.isPublished(),
					tags : this.model.getTags(),
					user : this.model.user ? this.model.user.toJSON() : null
				});
				return data;
			},
			showEditPost : function ()
			{
				App.vent.trigger('post:edit', this.model);
			},
			showAddToSet : function ()
			{
				App.vent.trigger('post:set', this.model);
			}
		});
	});
