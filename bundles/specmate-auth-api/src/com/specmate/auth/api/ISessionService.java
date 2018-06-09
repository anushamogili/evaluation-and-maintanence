package com.specmate.auth.api;

import com.specmate.common.SpecmateException;
import com.specmate.usermodel.AccessRights;

public interface ISessionService {
	public String create(AccessRights alm, AccessRights ppm, String projectName) throws SpecmateException;
	public String create();
	public boolean isExpired(String token) throws SpecmateException ;
	public boolean isAuthorized(String token, String path) throws SpecmateException;
	public void refresh(String token) throws SpecmateException;
	public AccessRights getSourceAccessRights(String token) throws SpecmateException;
	public AccessRights getTargetAccessRights(String token) throws SpecmateException;
	public void delete(String token) throws SpecmateException;
}