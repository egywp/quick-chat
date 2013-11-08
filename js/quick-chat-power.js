/* Quick Chat 4.20
 * http://www.techytalk.info/wordpress/quick-chat/
 */
var quick_chat=jQuery.extend(quick_chat||{},{toggle:!1,init_power:function(){jQuery("div.quick-chat-delete-link a").on("click",function(a){a.preventDefault();var b=jQuery(this).parents(".quick-chat-container").attr("data-quick-chat-id"),c=jQuery(this),d=[];jQuery(this).parents(".quick-chat-container").find(".quick-chat-history-container input[type=checkbox]:checked").each(function(){d.push(jQuery(this).val())});jQuery(this).fadeTo(100,0,function(){""==d?alert(quick_chat.i18n.delete_what_s):confirm(quick_chat.i18n.delete_confirm_s)&&
quick_chat.delete_messages(b,d);jQuery(c).fadeTo(100,1)})});jQuery("div.quick-chat-clean-link a").on("click",function(a){a.preventDefault();var b=jQuery(this).parents(".quick-chat-container").attr("data-quick-chat-id"),c=jQuery(this);jQuery(this).fadeTo(100,0,function(){confirm(quick_chat.i18n.clean_confirm_s.replace("%s",quick_chat.clean_target))&&quick_chat.clean_messages(b);jQuery(c).fadeTo(100,1)})});jQuery("div.quick-chat-ban-link a").on("click",function(a){a.preventDefault();var b=jQuery(this).parents(".quick-chat-container").attr("data-quick-chat-id"),
c=jQuery(this),d=[];jQuery(this).parents(".quick-chat-container").find(".quick-chat-users-container input[type=checkbox]:checked").each(function(){d.push(jQuery(this).val())});jQuery(this).fadeTo(100,0,function(){""==d?alert(quick_chat.i18n.ban_who_s):confirm(quick_chat.i18n.ban_confirm_s)&&quick_chat.ban_users(b,d);jQuery(c).fadeTo(100,1)})});jQuery(document).on("click","div.quick-chat-transcript-link a",function(a){a.preventDefault();var b=jQuery(this).parents(".quick-chat-container").attr("data-quick-chat-id"),
c=jQuery(this);jQuery(this).fadeTo(100,0,function(){quick_chat.transcript(b);jQuery(c).fadeTo(100,1)})});jQuery("div.quick-chat-select-all-link a").on("click",function(a){a.preventDefault();var b=jQuery(this);jQuery(this).fadeTo(100,0,function(){jQuery(b).parents(".quick-chat-container").find(".quick-chat-history-container input[type=checkbox]").prop("checked",!quick_chat.toggle);quick_chat.toggle=!quick_chat.toggle;jQuery(b).fadeTo(100,1)})})},delete_messages:function(a,b){var c=quick_chat.data[a].room_name;
jQuery.post(quick_chat.ajaxurl,{action:"quick-chat-ajax-delete",to_delete_ids:b,to_delete_room_name:c},function(a){if(a.rows_affected==b.length)for(var e in quick_chat.data){if(quick_chat.data[e].room_name==c)for(a=0;"undefined"!=typeof b[a];a++)jQuery("div[data-quick-chat-id="+e+'] input[type=checkbox][value="'+b[a]+'"]').parents(".quick-chat-history-message-alias-container").remove()}else location.reload(!0)})},clean_messages:function(a){var b=quick_chat.data[a].room_name;a=jQuery("div[data-quick-chat-id="+
a+"] div.quick-chat-history-container");var c=jQuery(a).children().size();c>quick_chat.clean_target&&jQuery.post(quick_chat.ajaxurl,{action:"quick-chat-ajax-clean",to_clean_room_name:b},function(a){var e=c-quick_chat.clean_target;if(a.rows_affected==e)for(var f in quick_chat.data){if(quick_chat.data[f].room_name==b){var g=e;for(a=jQuery("div[data-quick-chat-id="+f+"] div.quick-chat-history-container");0<g;g--)jQuery(a).children(":first").remove()}}else location.reload(!0)})},ban_users:function(a,
b){var c=jQuery.find('div[class=quick-chat-container][data-quick-chat-id="'+a+'"]');jQuery.post(quick_chat.ajaxurl,{action:"quick-chat-ajax-ban",to_ban_ips:b},function(a){jQuery(c).find(".quick-chat-users-container input[type=checkbox]").each(function(){jQuery(this).attr("checked",!1)})})},transcript:function(a){jQuery.post(quick_chat.ajaxurl,{action:"quick-chat-ajax-transcript",room_name:quick_chat.data[a].room_name},function(a){window.open(quick_chat.stripslashes(a.transcript_url))})}});quick_chat.init_power();