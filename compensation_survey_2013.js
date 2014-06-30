var isie = true;
var xml;

$(document).ready(function() {
	// for browser detection
	 if($.browser.webkit){
		b = 'wk';
		isie = false;
	}
	if($.browser.safari){
		b = 's';
		isie = false;
	}
	if($.browser.mozilla){
		b = 'mz';
		isie = false;
	}
	if($.browser.opera){
		b = 'o';
		isie = false;
	}  

	$.get('compensation_survey-index_content_2013.html', function(data){
		$('#compensation_survey-container').html(data);

		buildPage();
	});
});//end document ready
			
function buildPage(){
	//get css
	var style = 'compensation_survey_2013.css';

	if($.browser.msie){
		isie = true;
				
		document.createStyleSheet(style);

		if($.browser.version == 7){
			$('#compensation_survey-stock_options-title').css('margin-top', '41px;');
			$('#compensation_survey-take_home-title').css('margin-top', '57px;');
		}
	}else{
		var link = $('<link />');
		
		$(link).attr({ type: 'text/css', rel: 'stylesheet', href: style });
		
		$("head").append( link );
	}	

	//load the xml
	$.get('compensation_survey_2013.xml', function(data){
		xml = data;
		buildNav();
	});
};//buildPage

function buildNav(){
	var alternate = true;
	$(xml).find('company').each(function(i){
		var rank = parseInt($(this).find('rank_2013').text());
		var company_name = $(this).find('company_name').text();
		if(company_name == 'General Electric'){
			//do nothing
		}else{
			if(alternate == false){
				$('#compensation_survey-nav table > tbody tr:last').after('<tr style="background-color:#dddcc8;"><td class="compensation_survey-nav-rank" style="text-align:right; padding:10px 10px 5px 0px; border-top:1px dotted #ccc; border-right:1px dotted #ccc; border-bottom:1px dotted #ccc; width:64px;">'+rank+'</td><td class="compensation_survey-nav-company" style="padding:10px 0 5px 10px; border-top:1px dotted #ccc; border-left:1px dotted #ccc; border-bottom:1px dotted #ccc; width:144px;">'+company_name+'</td></tr>');
				
				alternate = true;
			}else{
				$('#compensation_survey-nav table > tbody tr:last').after('<tr style="background-color:#fff;"><td class="compensation_survey-nav-rank" style="text-align:right; padding:10px 10px 5px 0px; border-top:1px dotted #ccc; border-right:1px dotted #ccc; border-bottom:1px dotted #ccc; width:64px;">'+rank+'</td><td class="compensation_survey-nav-company" style="padding:10px 0 5px 10px; border-top:1px dotted #ccc; border-left:1px dotted #ccc; border-bottom:1px dotted #ccc; width:144px;">'+company_name+'</td></tr>');
				
				alternate = false;
			}
		}
		
		if(rank == 100){
			initNav();
		}
	});
};

function initNav(){
	var background_color;
	
	$('table.tablesorter').tableScroll({height:299});
	
	$("table.tablesorter").bind("sortStart",function() {
		$('table.tablesorter > tbody tr').css('background-color', '#fff');
	}).bind("sortEnd",function() {
		$('table.tablesorter > tbody tr:even').css('background-color', '#dddcc8');
	});
	
	$('#compensation_survey-nav table > tbody tr').hover(function(){
		background_color = $(this).css('background-color');
		
		$(this).css('background-color', '#F1EBC7');
	},function(){
		if(background_color == 'rgb(221, 220, 200)'){
			$(this).css('background-color', background_color);
		}else{
			$(this).css('background-color', '#fff');
		}
	});
	
	$('#compensation_survey-nav table > tbody tr').click(function(){
		var company_name = $('.compensation_survey-nav-company', this).text();
		
		loadData(company_name);
	});
	
	$('#compensation_survey-link').hover(function(){
		$(this).css('text-decoration', 'none')
	}, function(){
		$(this).css('text-decoration', 'underline');
	});
	
	$('#compensation_survey-link').click(function(){
		window.location = '/id=1202635302295';
	});
};

function loadData(company){
	var general_counsel;
	var company_name;
	var rank2013;
	var rank2012;
	var note;
	var content_image;
	var salary;
	var bonus;
	var total_cash;
	var stock_options;
	var take_home;
	var stock_awards;
	var option_awards;

	$(xml).find('company').each(function () {
	    var xml_company = $(this).find('company_name').text();

	    //alert('xml_company = '+xml_company+', company = '+company);

	    if (xml_company == company) {
	        general_counsel = $(this).find('gc').text();
	        company_name = $(this).find('company_name').text();
	        rank2013 = $(this).find('rank_2013').text();
	        rank2012 = $(this).find('rank_2012').text();
	        note = $(this).find('note').text();
	        content_image = $(this).find('photo').text();
	        salary = $(this).find('salary').text();
	        bonus = $(this).find('bonus').text();
	        total_cash = $(this).find('total_cash').text();
	        stock_options = $(this).find('realized_options').text();
	        take_home = $(this).find('total_cash_plus_options').text();
	        stock_awards = $(this).find('stock_awards').text();
	        option_awards = $(this).find('option_awards').text();
	        if (option_awards == '') { option_awards = 'n/a'; }
	    }
	});
	
	$('#compensation_survey-general_counsel').html(general_counsel);
	$('#compensation_survey-company').html(company_name);
	$('#compensation_survey-rank2013').html(rank2013);
	$('#compensation_survey-rank2012').html(rank2012);
	if(note == ''){
		$('#compensation_survey-note').html('');
	}else{
		$('#compensation_survey-note').html(note);
	}
	if(content_image == ''){
		$('#compensation_survey-content_image').html('');
	}else{
		$('#compensation_survey-content_image').html('<img src="'+content_image+'" width="128" height="128" alt="'+general_counsel+'" title="'+general_counsel+'" />');
	}
	$('#compensation_survey-salary').html(salary);
	$('#compensation_survey-bonus').html(bonus);
	$('#compensation_survey-total_cash').html(total_cash);
	$('#compensation_survey-stock_options').html(stock_options);
	$('#compensation_survey-take_home').html(take_home);
	$('#compensation_survey-stock_awards').html(stock_awards);
	$('#compensation_survey-option_awards').html(option_awards);
};
